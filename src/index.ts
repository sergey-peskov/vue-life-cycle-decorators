import { createDecorator } from 'vue-class-component';

type VueHooks =
	| 'beforeCreate'
	| 'created'
	| 'beforeDestroy'
	| 'destroyed'
	| 'beforeMount'
	| 'mounted'
	| 'beforeUpdate'
	| 'updated'
	| 'activated'
	| 'deactivated'

type VueHooksWithArguments = 'errorCaptured';


function vueHookFactory(hook: VueHooks) {
	return function () {
		return createDecorator((componentOptions, handler) => {
			let handlerFn = componentOptions.methods![handler];
			if (typeof handlerFn !== 'function') {
				throw new TypeError('handler is not a function');
			}
			let componentHook = componentOptions[hook] as () => void;
			componentOptions[hook] = function () {
				(this as any)[handler]();
				componentHook?.call(this);
			};
		});
	};
}

function vueHookFactoryWithArguments(hook: VueHooksWithArguments) {
	return function () {
		return createDecorator((componentOptions, handler) => {
			let handlerFn = componentOptions.methods![handler];
			if (typeof handlerFn !== 'function') {
				throw new TypeError('handler is not a function');
			}
			let componentHook = componentOptions[hook];
			componentOptions[hook] = function (...args) {
				(this as any)[handler].apply(this, args);
				componentHook?.apply(this, args);
			};
		});
	};
}

export const BeforeCreate = vueHookFactory('beforeCreate');
export const Created = vueHookFactory('created');
export const BeforeDestroy = vueHookFactory('beforeDestroy');
export const Destroyed = vueHookFactory('destroyed');
export const BeforeMount = vueHookFactory('beforeMount');
export const Mounted = vueHookFactory('mounted');
export const BeforeUpdate = vueHookFactory('beforeUpdate');
export const Updated = vueHookFactory('updated');
export const Activated = vueHookFactory('activated');
export const Deactivated = vueHookFactory('deactivated');
export const ErrorCaptured = vueHookFactoryWithArguments('errorCaptured');