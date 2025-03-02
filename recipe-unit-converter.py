#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import requests
from urllib.parse import parse_qs
import cgi
import io

def wsgi_app(environ, start_response):
    # obtener método de request
    request_method = environ['REQUEST_METHOD']
    
    # para métodos GET, mostrar el formulario
    if request_method == 'GET':
        path_info = environ.get('PATH_INFO', '')
        
        # devolver manifest.json si es necesario
        if path_info == '/manifest.json':
            start_response('200 OK', [('Content-Type', 'application/json')])
            manifest = {
                "name": "Conversor de unidades de receta",
                "url": environ.get('HTTP_HOST', 'localhost') + environ.get('SCRIPT_NAME', ''),
                "description": "Convierte ingredientes de una receta de unidades métricas a imperiales y viceversa",
                "authors": ["Claudia Rebeca Hodoroga, Federico Diaz"]
            }
            return [json.dumps(manifest).encode('utf-8')]
        
        # mostrar formulario 
        start_response('200 OK', [('Content-Type', 'text/html')])
        return ['''
            <html>
                <head>
                    <title>Conversor de unidades para recetas</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .container { max-width: 600px; margin: 0 auto; }
                        h1 { color: #333; }
                        .info { background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
                        code { background-color: #e0e0e0; padding: 2px 4px; border-radius: 3px; }
                        form { margin-top: 20px; }
                        label, input, select { display: block; margin-bottom: 10px; }
                        button { margin-top: 10px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>API de Conversión de Unidades</h1>
                        <div class="info">
                            <p><strong>Descripción:</strong> Esta API convierte ingredientes de recetas de unidades métricas a imperiales y viceversa.</p>
                            <p><strong>Parameters:</strong></p>
                            <ul>
                                <li><code>source_system</code>: "métricas" or "imperiales" - el sistema original de medida</li>
                                <li><code>target_system</code>: "métricas" or "imperiales" - el sistema de medida deseado</li>
                                <li><code>ingredients</code>: array de JSON array de ingredientes con nombre, cantidad, y unidades</li>
                            </ul>
                        </div>
                        
                        <form action="" method="post">
                            <h2>Convertir Receta</h2>
                            
                            <label for="source_system">Sistema original:</label>
                            <select name="source_system" id="source_system">
                                <option value="metric">Métrico</option>
                                <option value="imperial">Imperial</option>
                            </select>
                            
                            <label for="target_system">Sistema deseado:</label>
                            <select name="target_system" id="target_system">
                                <option value="imperial">Imperial</option>
                                <option value="metric">Métrico</option>
                            </select>
                            
                            <label for="ingredients">Ingredientes (formato JSON):</label>
                            <textarea name="ingredients" id="ingredients" rows="6" cols="50">[
  {"name": "flour", "amount": 2, "unit": "cup"},
  {"name": "sugar", "amount": 0.5, "unit": "lb"}
]</textarea>
                            
                            <button type="submit">Convertir</button>
                        </form>
                    </div>
                </body>
            </html>
        '''.encode('utf-8')]
    
    # para métodos POST, procesar los datos
    elif request_method == 'POST':
        try:
            # pedir tamaño del cuerpo
            content_length = int(environ.get('CONTENT_LENGTH', 0))
            
            # obtener tipo de contenido
            content_type = environ.get('CONTENT_TYPE', '')
            
            # procesar de los datos
            if 'application/x-www-form-urlencoded' in content_type or 'multipart/form-data' in content_type:
                form = cgi.FieldStorage(fp=environ['wsgi.input'], environ=environ)
                
                source_system = form.getvalue('source_system')
                target_system = form.getvalue('target_system')
                ingredients_json = form.getvalue('ingredients')
                
                try:
                    ingredients = json.loads(ingredients_json)
                except:
                    start_response('400 Bad Request', [('Content-Type', 'application/json')])
                    return [json.dumps({"error": "Campo JSON de ingredientes invalido"}).encode('utf-8')]
            
            # procesar datos JSON directos
            elif 'application/json' in content_type:
                request_body = environ['wsgi.input'].read(content_length)
                data = json.loads(request_body)
                
                source_system = data.get('source_system')
                target_system = data.get('target_system')
                ingredients = data.get('ingredients', [])
            
            else:
                start_response('415 Unsupported Media Type', [('Content-Type', 'application/json')])
                return [json.dumps({"error": "Tipo de contenido no soportado"}).encode('utf-8')]
            
            # Validate input
            if not source_system or not target_system or not ingredients:
                start_response('400 Bad Request', [('Content-Type', 'application/json')])
                return [json.dumps({"error": "Faltan parametros requeridos"}).encode('utf-8')]
                
            if source_system not in ['metric', 'imperial'] or target_system not in ['metric', 'imperial']:
                start_response('400 Bad Request', [('Content-Type', 'application/json')])
                return [json.dumps({"error": "Tipo de sistema invalido. Usa 'metric' o 'imperial.'"}).encode('utf-8')]
            
            # saltar conversion si las dos unidades son iguales
            if source_system == target_system:
                start_response('200 OK', [('Content-Type', 'application/json')])
                result = {
                    "source_system": source_system,
                    "target_system": target_system,
                    "converted_ingredients": ingredients
                }
                return [json.dumps(result).encode('utf-8')]
            
            # procesar cada ingrediente
            converted_ingredients = []
            for ingredient in ingredients:
                name = ingredient.get('name')
                amount = ingredient.get('amount')
                unit = ingredient.get('unit')
                
                # validar datos de los ingredientes
                if not name or amount is None or not unit:
                    start_response('400 Bad Request', [('Content-Type', 'application/json')])
                    return [json.dumps({"error": f"Datos de ingredientes incorrectos: {ingredient}"}).encode('utf-8')]
                
                # llamar a la API externa para la conversión
                api_url = f"https://akshayanandraut.github.io/api-unit-converter/?from={unit}&to=&value={amount}"
                response = requests.get(api_url)
                
                if response.status_code != 200:
                    start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
                    return [json.dumps({"error": f"Error de la API de conversion: {response.text}"}).encode('utf-8')]
                
                try:
                    conversion_data = response.json()
                    
                    # encontrar la conversión adecuada al sistema usado
                    converted = {}
                    converted["name"] = name
                    converted["original"] = {"amount": amount, "unit": unit}
                    
                    # seleccionar unidades adecuadas de los resultados
                    if "results" in conversion_data and conversion_data["results"]:
                        # filtrar resultados según el sistema deseado
                        target_results = []
                        
                        for result in conversion_data["results"]:
                            result_unit = result.get("unit", "")
                            
                            # determinar si una unidad es imperial o métrica
                            is_metric_unit = any(u in result_unit.lower() for u in 
                                                ["gram", "kilo", "liter", "litre", "meter", "metre", "ml", "cm", "g", "kg", "l"])
                            is_imperial_unit = any(u in result_unit.lower() for u in 
                                                ["cup", "tablespoon", "teaspoon", "ounce", "pound", "inch", "feet", "gallon", 
                                                 "quart", "pint", "tbsp", "tsp", "oz", "lb", "in", "ft"])
                            
                            if (target_system == "metric" and is_metric_unit) or \
                               (target_system == "imperial" and is_imperial_unit):
                                target_results.append(result)
                        
                        # usar las conversiones si se han encontrado
                        if target_results:
                            best_result = target_results[0]
                            converted["converted"] = {
                                "amount": best_result.get("value"),
                                "unit": best_result.get("unit")
                            }
                        else:
                            # si no se ha encontrado una conversión
                            converted["converted"] = {"amount": amount, "unit": unit}
                            converted["note"] = "No se ha encontrado una unidad de conversion adecuada"
                    else:
                        converted["converted"] = {"amount": amount, "unit": unit}
                        converted["note"] = "No conversion data available"
                    
                    converted_ingredients.append(converted)
                    
                except json.JSONDecodeError:
                    start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
                    return [json.dumps({"error": "Respuesta de API de conversion invalida"}).encode('utf-8')]
            
            # preparar la respuesta
            result = {
                "source_system": source_system,
                "target_system": target_system,
                "converted_ingredients": converted_ingredients
            }
            
            start_response('200 OK', [('Content-Type', 'application/json')])
            return [json.dumps(result).encode('utf-8')]
            
        except Exception as e:
            start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
            return [json.dumps({"error": str(e)}).encode('utf-8')]
    
    # para otras peticiones de métodos
    else:
        start_response('405 Method Not Allowed', [('Content-Type', 'text/plain')])
        return [b'Metodo no permitido']

application = wsgi_app  # necesario para mod_wsgi