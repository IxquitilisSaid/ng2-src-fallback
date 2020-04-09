import {
	Directive,
	OnDestroy,
	Input,
	Output,
	EventEmitter,
	ElementRef,
	Renderer2
} from '@angular/core';
import {ICustomFallbackConfig} from './custom-fallback-config';

@Directive({
	selector: '[ng2-src-fallback]'
})

export class Ng2SrcFallbackDirective implements OnDestroy {
	private _isApplied = false;
	private ERROR_EVENT_TYPE = 'error';
	private LOAD_EVENT_TYPE = 'load';
	private _targetImageElement: HTMLImageElement;
	private cancelOnError: () => void;
	private cancelOnLoad: () => void;

	public customFallbackURL?: string;

	@Input() srcFallback: string;
	@Input() customFallbackConfig?: ICustomFallbackConfig;

	@Output() wasLoaded = new EventEmitter<boolean>();

	constructor(private el: ElementRef, private renderer: Renderer2) {
		this._targetImageElement = el.nativeElement;

		this.onError = this.onError.bind(this);
		this.onLoad = this.onLoad.bind(this);

		this.addListeners();
	}

	ngOnDestroy() {
		this.removeErrorEvent();
		this.removeOnLoadEvent();
	}

	private onError() {
		this.srcIsFallback()
			? this.setSrcToFallback()
			: this.removeOnLoadEvent();
	}

	private setSrcToFallback() {
		this._isApplied = true;

		this.renderer.setAttribute(
			this._targetImageElement,
			'src',
			this.srcFallback
		);
	}

	private srcIsFallback() {
		return this._targetImageElement.getAttribute('src') !== this.srcFallback;
	}

	private generateCustomFallback() {
		const canvas = document.createElement("canvas");

		this.renderer.setAttribute(
			canvas,
			'height',
			this.customFallbackConfig?.height
		);

		this.renderer.setAttribute(
			canvas,
			'width',
			this.customFallbackConfig?.width
		);

		this.styleCanvas(canvas);
	}

	private styleCanvas(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');

		ctx.fillStyle = this.customFallbackConfig?.bgColour;
		ctx.fillRect(
			0, 0,
			canvas.width,
			canvas.height
		);

		ctx.font = this.customFallbackConfig?.textSizeAndFont;
		ctx.textAlign = this.customFallbackConfig?.textAlign;
		ctx.textBaseline = this.customFallbackConfig?.textBaseline;

		ctx.fillStyle = this.customFallbackConfig?.textColour;
		ctx.fillText(
			this.customFallbackConfig?.textContent,
			canvas.width / 2,
			canvas.height / 2
		);

		this.generateFallbackImg(canvas);
	}

	private generateFallbackImg(canvas: HTMLCanvasElement) {
		this.customFallbackURL = canvas
			.toDataURL(`image/${this.customFallbackConfig?.mimeType}`);
	}

	private onLoad() {
		this.wasLoaded.emit(this._isApplied);
	}

	private removeErrorEvent() {
		if (this.cancelOnError) {
			this.cancelOnError();
		}
	}

	private removeOnLoadEvent() {
		if (this.cancelOnLoad) {
			this.cancelOnLoad();
		}
	}

	private addListeners() {
		this.cancelOnError = this.renderer.listen(
			this._targetImageElement,
			this.ERROR_EVENT_TYPE,
			this.onError
		);

		this.cancelOnLoad = this.renderer.listen(
			this._targetImageElement,
			this.LOAD_EVENT_TYPE,
			this.onLoad
		);
	}
}
