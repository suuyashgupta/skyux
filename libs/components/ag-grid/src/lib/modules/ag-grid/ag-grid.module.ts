import { AgGridModule } from '@ag-grid-community/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkyViewkeeperModule } from '@skyux/core';
import { SkyDataManagerModule } from '@skyux/data-manager';
import { SkyInlineDeleteModule } from '@skyux/layout';

import { SkyAgGridDataManagerAdapterDirective } from './ag-grid-data-manager-adapter.directive';
import { SkyAgGridRowDeleteComponent } from './ag-grid-row-delete.component';
import { SkyAgGridRowDeleteDirective } from './ag-grid-row-delete.directive';
import { SkyAgGridWrapperComponent } from './ag-grid-wrapper.component';
import { SkyAgGridCellEditorAutocompleteModule } from './cell-editors/cell-editor-autocomplete/cell-editor-autocomplete.module';
import { SkyAgGridCellEditorCurrencyModule } from './cell-editors/cell-editor-currency/cell-editor-currency.module';
import { SkyAgGridCellEditorDatepickerModule } from './cell-editors/cell-editor-datepicker/cell-editor-datepicker.module';
import { SkyAgGridCellEditorLookupModule } from './cell-editors/cell-editor-lookup/cell-editor-lookup.module';
import { SkyAgGridCellEditorNumberModule } from './cell-editors/cell-editor-number/cell-editor-number.module';
import { SkyAgGridCellEditorTextModule } from './cell-editors/cell-editor-text/cell-editor-text.module';
import { SkyAgGridCellRendererCurrencyModule } from './cell-renderers/cell-renderer-currency/cell-renderer-currency.module';
import { SkyAgGridCellRendererLookupModule } from './cell-renderers/cell-renderer-lookup/cell-renderer-lookup.module';
import { SkyAgGridCellRendererRowSelectorModule } from './cell-renderers/cell-renderer-row-selector/cell-renderer-row-selector.module';
import { SkyAgGridCellRendererValidatorTooltipModule } from './cell-renderers/cell-renderer-validator-tooltip/cell-renderer-validator-tooltip.module';
import { SkyAgGridCellValidatorModule } from './cell-validator/ag-grid-cell-validator.module';

@NgModule({
  declarations: [
    SkyAgGridDataManagerAdapterDirective,
    SkyAgGridRowDeleteComponent,
    SkyAgGridRowDeleteDirective,
    SkyAgGridWrapperComponent,
  ],
  imports: [
    AgGridModule,
    CommonModule,
    SkyAgGridCellEditorAutocompleteModule,
    SkyAgGridCellEditorDatepickerModule,
    SkyAgGridCellEditorLookupModule,
    SkyAgGridCellEditorNumberModule,
    SkyAgGridCellEditorCurrencyModule,
    SkyAgGridCellRendererCurrencyModule,
    SkyAgGridCellRendererLookupModule,
    SkyAgGridCellRendererRowSelectorModule,
    SkyAgGridCellRendererValidatorTooltipModule,
    SkyAgGridCellValidatorModule,
    SkyAgGridCellEditorTextModule,
    SkyDataManagerModule,
    SkyInlineDeleteModule,
    SkyViewkeeperModule,
  ],
  exports: [
    SkyAgGridDataManagerAdapterDirective,
    SkyAgGridRowDeleteComponent,
    SkyAgGridRowDeleteDirective,
    SkyAgGridWrapperComponent,
  ],
})
export class SkyAgGridModule {}
