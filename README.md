# vue-life-cycle-decorators

Vue lifecycle hooks for [vue-class-component](https://github.com/vuejs/vue-class-component)

## Installation

``` sh
npm i -S vue-life-cycle-decorators
```

## Usage

```ts
import Vue from 'vue';
import Component from 'vue-class-component';
import { BeforeCreate } from 'vue-life-cycle-decorators';

@Component
export default class App extends Vue {
	inputValue: string = '';

	@BeforeCreate()
	onBeforeCreate() {}
	
	beforeCreate() {
		console.log('beforeCreate');
	}
}
```

is equivalent to

```ts
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
	onBeforeCreate() {}

	beforeCreate() {
		this.onBeforeCreate();
		console.log('beforeCreate');
	}
}
```