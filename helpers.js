// js helper functions

var Promise = Promise || ES6Promise.Promise

var addQuery = function (url, query) {
	url += url.contains('?') ? '&' : '?'
	url += query
	return url
}

var isRightClick = function (event) {
	return event.which == 3 || event.button == 2
}

var range = function (length) {
	var list = []
	for (var i = 0; i < length; i++) {
		list.push(i)
	}
	return list
}

function getNybbles(data) {
	var nybbles = []
	data.forEach(function (b) {
		nybbles.push (b & 0xf)
		nybbles.push (b >>> 4)
	})
	return nybbles
}

Object.update = Object.update || function (object, properties, options) {
	options = options || {}
	if (typeof options.careful === 'undefined') options.careful = false // Useful for updating trapped properties only when they're actually different.
	if (typeof options.setdefault === 'undefined') options.setdefault = false // If the property exists, don't touch it
	for (var i in properties) {
		var prop = properties[i]
		if (options.careful) {
			if (object[i] !== prop) {
				object[i] = prop
			}
		}
		else if (options.setdefault) {
			if (typeof object[i] === 'undefined') {
				object[i] = prop
			}
		}
		else {
			object[i] = prop
		}
	}
	return object
}

var replaceChild = function (container, child) {
	var maybe = container.children[child.id]
	if (maybe !== undefined) {
		if (maybe !== child) {
			container.removeChild(maybe)
			container.appendChild(child)
		}
	} else {
		container.appendChild(child)
	}
}

function subdivide(list, length) {
	var new_list = []
	for (var i = 0; i < list.length; i += length) {
		new_list.push(list.slice(i, i + length))
	}
	return new_list
}


function request(url, options) {
	return new Promise( function (resolve, reject) {
		ajax(url, resolve, reject, options)
	})
}

function ajax(url, resolve, reject, options) {
	options = options || {}
	options = Object.update({
		binary: false,
		method: 'GET',
		data: undefined,
		cache: false,
	}, options)

	var xhr = new XMLHttpRequest()
	xhr.open(options.method, url, true)
	if (options.cache === false && options.method !== 'POST') {
		xhr.setRequestHeader('Cache-Control', 'max-age=0, must-revalidate')
	}
	if (options.binary) {
		xhr.overrideMimeType('text/plain; charset=x-user-defined');
	}

	xhr.addEventListener('readystatechange', function () {
		var complete = 4
		if (xhr.readyState === complete) {
			if (xhr.status === 200) {
				var response = xhr.responseText
				if (options.binary) {
					var data = []
					for (var i = 0; i < response.length; i++) {
						data.push(response.charCodeAt(i) & 0xff)
					}
					resolve(data)
				} else {
					resolve(response)
				}
			} else {
				reject(xhr)
			}
		}
	})
	xhr.addEventListener('error', function () {
		reject(xhr)
	})

	xhr.send(options.data)
}

String.prototype.contains = String.prototype.contains || function (term) {
	return this.indexOf(term) !== -1
}

String.prototype.title = String.prototype.title || function () {
	return this.replace(/[a-zA-Z]*/g, function (word) { return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase() })
}

String.prototype.repeat = String.prototype.repeat || function(length) {
	return new Array(length + 1).join(this);
}

String.prototype.zfill = String.prototype.zfill || function(length) {
	return '0'.repeat(length - this.length) + this;
}

function zfill(number, length) {
	// <number> can already be a string, obviously
	return number.toString().zfill(length)
}

function dictzip (keys, values) {
	var object = {}
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i]
		var value = values[i]
		object[key] = value
	}
	return object
}
