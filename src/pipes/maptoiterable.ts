import {Pipe} from '@angular/core';
 
@Pipe({
	name: 'mapToIterable'
})
export class MapToIterable {
	transform(obj: Object): any {
		if(obj) {
			var arr = Object.keys(obj).map((key)=>{ let item = obj[key]; item['$key'] = key; return item; });
			return arr;
		} else {
			return obj;
		}
	}
}