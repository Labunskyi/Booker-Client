export default function dateFilter(value, format = 'date') {
    const options = {}
    if (format.includes('date')){
        options.day = '2-digit'
        options.month = '2-digit'
        options.year = 'numeric'
    }

    if (format.includes('time')){
        options.hour = '2-digit'
        options.minute = '2-digit'
        
    }
	if (format.includes('format')){
        return new Intl.DateTimeFormat('en-Gb', options).format(new Date(value))
    } else {
		return new Intl.DateTimeFormat('en-Us', options).format(new Date(value))
	}
}