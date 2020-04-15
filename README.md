# NG2 SRC FALLBACK

An Angular directive that substitutes the primary image with a fallback should it fail to load.

## Features

- Default fallback - If at first you don't succeed, provide a fallback image to ```srcFallback``` input
- On-The-Fly Fallback creation - If for some reason you don't have an image to set as fallback, check the [customFallbackConfig](#customFallbackConfig)

## Install

```
npm i --save ng2-src-fallback
```

## Basic Usage

Add the ```Ng2SrcFallbackModule``` module to your module's ```imports```

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {Ng2SrcFallbackModule} from 'ng2-src-fallback';

@NgModule({
	imports: [
		BrowserModule,
		Ng2SrcFallbackModule
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})

export class AppModule {}
```

Then add it to your component

```typescript
import {Component} from '@angular/core';

@Component({
  	selector: 'neat-app',
  	template: `
	  	<img
	  		src="can_of_beans.png"
			ng2-src-fallback
			[srcFallback]="fallbackImgURL">
	`
})

export class AppComponent {
  	public fallbackImgURL = 'http://placehold.it/200x200';
}

```

## `customFallbackConfig`

Let's say, for some reason, you don't have an image you can use as fallback. Instead of providing a value to the ```[srcFallback]``` input, you can use the ```[customFallbackConfig]``` to generate 'On-The-Fly' custom placeholder images.

### `ICustomFallbackConfig`
- height (obligatory) - Height of the generated Image (String containing the numeric value and CSS unit);
- width (obligatory) - Width of the generated Image (String containing the numeric value and CSS unit);
- bgColour (optional) - Background colour of the generated Image (String);
- textSizeAndFont (optional) - Styling of the Text inside the generated Image (String, same syntax as CSS ```font``` property);
- textColour (optional) - Colour of the Text inside the generated Image (String);
- textContent (optional) - The text you want to display inside the generated Image (String);
- textAlign (optional) - The alignment of the text you want to display inside the generated Image (String: CanvasTextAlign);
- textBaseline (optional) - The Baseline alignment of the text you want to display inside the generated Image (String: CanvasTextBaseline);
- mimeType (optional) - The mime type of the generated Image (String: 'jpeg' | 'png');

### Usage

Add the ```Ng2SrcFallbackModule``` module to your module's ```imports```

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app';
import {Ng2SrcFallbackModule} from 'ng2-src-fallback';

@NgModule({
	imports: [
		BrowserModule,
		Ng2SrcFallbackModule
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})

export class AppModule {}
```

Then add it to your component and provide a configuration object to the ```[customFallbackConfig]``` input

```typescript
import {Component} from '@angular/core';
import {ICustomFallbackConfig} from 'ng2-src-fallback/custom-fallback-config';

@Component({
  	selector: 'neat-app',
  	template: `
	  	<img
	  		src="can_of_beans.png"
			ng2-src-fallback
			[customFallbackConfig]="customFallbackConfig">
	`
})

export class AppComponent {
	public customFallbackConfig: ICustomFallbackConfig = {
		height: '200px',
		width: '200px',
		bgColour: 'black',
		textSizeAndFont: '20px sans-serif',
		textColour: 'white',
		textContent: '200x200',
		textAlign: 'center',
		textBaseline: 'middle',
		mimeType: 'jpeg'
	};
}

```

## Events

### `(wasLoaded)`

`ng2-src-fallback` exposes a `(wasLoaded)` event that emits when either the `src` or `srcFallback` is loaded.
To determine whether the original source or the fallback was loaded, add a param to your callback for the `(wasLoaded)` event.

#### Example:

First add callback to your component

```typescript
wasLoaded(isFallback: boolean) {
	// do something based on 'isFallback'
	// or console.log it, don't just take my word
}
```
and then bind it to the `wasLoaded` event

```html
<img
	src="a_cat.png"
	ng2-src-fallback
	[srcFallback]="picture2.png"
	(wasLoaded)="onLoaded($event)">
```

### License

[MIT](https://tldrlegal.com/license/mit-license) © [Jaime 'Gondola' Oliveira](https://github.com/IxquitilisSaid)