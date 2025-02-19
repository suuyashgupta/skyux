import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SkyOverlayInstance, SkyOverlayService } from '@skyux/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SkyPopoverContentComponent } from './popover-content.component';
import { SkyPopoverContext } from './popover-context';
import { SkyPopoverAlignment } from './types/popover-alignment';
import { SkyPopoverPlacement } from './types/popover-placement';
import { SkyPopoverType } from './types/popover-type';

@Component({
  selector: 'sky-popover',
  templateUrl: './popover.component.html',
})
export class SkyPopoverComponent implements OnDestroy {
  /**
   * Specifies the horizontal alignment of the popover in relation to the trigger element.
   * The `skyPopoverAlignment` property on the popover directive takes precedence over this property when specified.
   * @default "center"
   */
  @Input()
  public set alignment(value: SkyPopoverAlignment | undefined) {
    this._alignment = value;
  }

  public get alignment(): SkyPopoverAlignment {
    return this._alignment || 'center';
  }

  /**
   * Indicates whether to close the popover when it loses focus.
   * To require users to click a trigger button to close the popover, set this input to false.
   * @default true
   */
  @Input()
  public set dismissOnBlur(value: boolean | undefined) {
    this._dismissOnBlur = value;
  }

  public get dismissOnBlur(): boolean {
    if (this._dismissOnBlur === undefined) {
      return true;
    }

    return this._dismissOnBlur;
  }

  /**
   * Specifies the placement of the popover in relation to the trigger element.
   * The `skyPopoverPlacement` property on the popover directive takes precedence over this property when specified.
   * @default "above"
   */
  @Input()
  public set placement(value: SkyPopoverPlacement) {
    this._placement = value;
  }

  public get placement(): SkyPopoverPlacement {
    return this._placement || 'above';
  }

  /**
   * Specifies a title for the popover.
   */
  @Input()
  public popoverTitle: string | undefined;

  /**
   * Specifies the type of popover.
   * @default "info"
   */
  @Input()
  public set popoverType(value: SkyPopoverType | undefined) {
    this._popoverType = value;
  }

  public get popoverType(): SkyPopoverType {
    return this._popoverType || 'info';
  }

  /**
   * Fires when users close the popover.
   */
  @Output()
  public popoverClosed = new EventEmitter<SkyPopoverComponent>();

  /**
   * Fires when users open the popover.
   */
  @Output()
  public popoverOpened = new EventEmitter<SkyPopoverComponent>();

  /**
   * Indicates that the popover is in the process of being opened or closed.
   * @internal
   */
  public isActive = false;

  /**
   * Used by unit tests to disable animations since the component is injected at the bottom of the
   * document body.
   * @internal
   */
  public enableAnimations = true;

  public isMouseEnter = false;

  @ViewChild('templateRef', {
    read: TemplateRef,
    static: true,
  })
  private templateRef!: TemplateRef<unknown>;

  private contentRef!: SkyPopoverContentComponent;

  private isMarkedForCloseOnMouseLeave = false;

  private ngUnsubscribe = new Subject<void>();

  private overlay: SkyOverlayInstance | undefined;

  private _alignment: SkyPopoverAlignment | undefined;

  private _dismissOnBlur: boolean | undefined;

  private _placement: SkyPopoverPlacement | undefined;

  private _popoverType: SkyPopoverType | undefined;

  constructor(private overlayService: SkyOverlayService) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    if (this.overlay) {
      this.overlayService.close(this.overlay);
      this.overlay = undefined;
    }
  }

  /**
   * Positions the popover next to a given caller element.
   * @param caller The element that opened the popover.
   * @param placement The placement of the popover.
   * @param alignment The horizontal alignment of the popover.
   * @internal
   */
  public positionNextTo(
    caller: ElementRef,
    placement?: SkyPopoverPlacement,
    alignment?: SkyPopoverAlignment
  ): void {
    if (!this.overlay) {
      this.setupOverlay();
    }

    this.placement = placement ?? this.placement;
    this.alignment = alignment ?? this.alignment;
    this.isActive = true;

    this.contentRef.open(caller, {
      dismissOnBlur: this.dismissOnBlur,
      enableAnimations: this.enableAnimations,
      horizontalAlignment: this.alignment,
      isStatic: false,
      placement: this.placement,
      popoverTitle: this.popoverTitle,
      popoverType: this.popoverType,
    });
  }

  /**
   * Closes the popover.
   * @internal
   */
  public close(): void {
    /*istanbul ignore next*/
    this.contentRef?.close();
  }

  /**
   * Brings focus to the popover element if its open.
   * @internal
   */
  public applyFocus(): void {
    /*istanbul ignore next*/
    this.contentRef?.applyFocus();
  }

  /**
   * Adds a flag to the popover to close when the mouse leaves the popover's bounds.
   * @internal
   */
  public markForCloseOnMouseLeave(): void {
    this.isMarkedForCloseOnMouseLeave = true;
  }

  private setupOverlay(): void {
    const overlay = this.overlayService.create({
      enableScroll: true,
      enablePointerEvents: true,
    });

    overlay.backdropClick.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      if (this.dismissOnBlur) {
        this.close();
      }
    });

    const contentRef = overlay.attachComponent(SkyPopoverContentComponent, [
      {
        provide: SkyPopoverContext,
        useValue: new SkyPopoverContext({
          contentTemplateRef: this.templateRef,
        }),
      },
    ]);

    contentRef.opened.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.popoverOpened.emit(this);
    });

    contentRef.closed.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      /*istanbul ignore else*/
      if (this.isActive && this.overlay) {
        this.overlayService.close(this.overlay);
        this.overlay = undefined;
        this.isActive = false;
        this.popoverClosed.emit(this);
      }
    });

    contentRef.isMouseEnter
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isMouseEnter) => {
        this.isMouseEnter = isMouseEnter;
        if (this.isMarkedForCloseOnMouseLeave) {
          this.isMarkedForCloseOnMouseLeave = false;
          this.close();
        }
      });

    this.overlay = overlay;
    this.contentRef = contentRef;
  }
}
