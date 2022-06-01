import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, expectAsync } from '@skyux-sdk/testing';

import { Column, KeyCode } from 'ag-grid-community';

import { SkyAgGridFixtureComponent } from '../../fixtures/ag-grid.component.fixture';
import { SkyAgGridFixtureModule } from '../../fixtures/ag-grid.module.fixture';
import { SkyCellClass } from '../../types/cell-class';
import { SkyCellEditorTextParams } from '../../types/cell-editor-text-params';

import { SkyAgGridCellEditorTextComponent } from './cell-editor-text.component';

describe('SkyCellEditorTextComponent', () => {
  // We've had some issue with grid rendering causing the specs to timeout in IE. Extending it slightly to help.
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 7500;

  let textEditorFixture: ComponentFixture<SkyAgGridCellEditorTextComponent>;
  let textEditorComponent: SkyAgGridCellEditorTextComponent;
  let textEditorNativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAgGridFixtureModule],
    });

    textEditorFixture = TestBed.createComponent(
      SkyAgGridCellEditorTextComponent
    );
    textEditorNativeElement = textEditorFixture.nativeElement;
    textEditorComponent = textEditorFixture.componentInstance;

    textEditorFixture.detectChanges();
  });

  it('renders a text input when editing a text cell in an ag grid', () => {
    const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    const gridNativeElement = gridFixture.nativeElement;

    gridFixture.detectChanges();

    const textCellElement = gridNativeElement.querySelector(
      `.${SkyCellClass.Text}`
    );
    const textCellEditorSelector = `.ag-cell-inline-editing.${SkyCellClass.Text}`;
    let inputElement = gridNativeElement.querySelector(textCellEditorSelector);

    expect(inputElement).toBeNull();

    textCellElement.click();

    inputElement = gridNativeElement.querySelector(textCellEditorSelector);

    expect(inputElement).toBeVisible();
  });

  describe('agInit', () => {
    it('initializes the SkyCellEditorTextComponent properties', () => {
      const value = 'testing';
      const columnWidth = 100;
      const column = new Column(
        {
          colId: 'col',
        },
        undefined,
        'col',
        true
      );

      column.setActualWidth(columnWidth);

      const cellEditorParams: SkyCellEditorTextParams = {
        value,
        colDef: { headerName: 'Test text cell' },
        rowIndex: 1,
        column,
        node: undefined,
        keyPress: undefined,
        charPress: undefined,
        columnApi: undefined,
        data: undefined,
        api: undefined,
        cellStartedEdit: true,
        onKeyDown: undefined,
        context: undefined,
        $scope: undefined,
        stopEditing: undefined,
        eGridCell: undefined,
        parseValue: undefined,
        formatValue: undefined,
        skyComponentProperties: {
          maxlength: undefined,
        },
      };
      textEditorFixture.detectChanges();

      expect(textEditorComponent.editorForm.get('text').value).toBeNull();
      expect(textEditorComponent.columnWidth).toBeUndefined();

      textEditorComponent.agInit(cellEditorParams);

      expect(textEditorComponent.editorForm.get('text').value).toEqual(value);
      expect(textEditorComponent.columnWidth).toEqual(columnWidth);
    });

    it('initializes with a cleared value when Backspace triggers the edit', () => {
      const value = 'testing';
      const columnWidth = 100;
      const column = new Column(
        {
          colId: 'col',
        },
        undefined,
        'col',
        true
      );

      column.setActualWidth(columnWidth);

      const cellEditorParams: SkyCellEditorTextParams = {
        value,
        colDef: { headerName: 'Test text cell' },
        rowIndex: 1,
        column,
        node: undefined,
        keyPress: KeyCode.BACKSPACE,
        charPress: undefined,
        columnApi: undefined,
        data: undefined,
        api: undefined,
        cellStartedEdit: true,
        onKeyDown: undefined,
        context: undefined,
        $scope: undefined,
        stopEditing: undefined,
        eGridCell: undefined,
        parseValue: undefined,
        formatValue: undefined,
        skyComponentProperties: {
          maxlength: undefined,
        },
      };
      textEditorFixture.detectChanges();

      expect(textEditorComponent.editorForm.get('text').value).toBeNull();

      textEditorComponent.agInit(cellEditorParams);

      expect(textEditorComponent.editorForm.get('text').value).toBeUndefined();
    });

    it('initializes with a cleared value when Delete triggers the edit', () => {
      const value = 'testing';
      const columnWidth = 100;
      const column = new Column(
        {
          colId: 'col',
        },
        undefined,
        'col',
        true
      );

      column.setActualWidth(columnWidth);

      const cellEditorParams: SkyCellEditorTextParams = {
        value,
        colDef: { headerName: 'Test text cell' },
        rowIndex: 1,
        column,
        node: undefined,
        keyPress: KeyCode.DELETE,
        charPress: undefined,
        columnApi: undefined,
        data: undefined,
        api: undefined,
        cellStartedEdit: true,
        onKeyDown: undefined,
        context: undefined,
        $scope: undefined,
        stopEditing: undefined,
        eGridCell: undefined,
        parseValue: undefined,
        formatValue: undefined,
        skyComponentProperties: {
          maxlength: undefined,
        },
      };
      textEditorFixture.detectChanges();

      expect(textEditorComponent.editorForm.get('text').value).toBeNull();

      textEditorComponent.agInit(cellEditorParams);

      expect(textEditorComponent.editorForm.get('text').value).toBeUndefined();
    });

    it('initializes with the current value when F2 triggers the edit', () => {
      const value = 'testing';
      const columnWidth = 100;
      const column = new Column(
        {
          colId: 'col',
        },
        undefined,
        'col',
        true
      );

      column.setActualWidth(columnWidth);

      const cellEditorParams: SkyCellEditorTextParams = {
        value,
        colDef: { headerName: 'Test text cell' },
        rowIndex: 1,
        column,
        node: undefined,
        keyPress: KeyCode.F2,
        charPress: undefined,
        columnApi: undefined,
        data: undefined,
        api: undefined,
        cellStartedEdit: true,
        onKeyDown: undefined,
        context: undefined,
        $scope: undefined,
        stopEditing: undefined,
        eGridCell: undefined,
        parseValue: undefined,
        formatValue: undefined,
        skyComponentProperties: {
          maxlength: undefined,
        },
      };
      textEditorFixture.detectChanges();

      expect(textEditorComponent.editorForm.get('text').value).toBeNull();

      textEditorComponent.agInit(cellEditorParams);

      expect(textEditorComponent.editorForm.get('text').value).toBe('testing');
    });

    it('initializes with the current value when Enter triggers the edit', () => {
      const value = 'testing';
      const columnWidth = 100;
      const column = new Column(
        {
          colId: 'col',
        },
        undefined,
        'col',
        true
      );

      column.setActualWidth(columnWidth);

      const cellEditorParams: SkyCellEditorTextParams = {
        value,
        colDef: { headerName: 'Test text cell' },
        rowIndex: 1,
        column,
        node: undefined,
        keyPress: KeyCode.ENTER,
        charPress: undefined,
        columnApi: undefined,
        data: undefined,
        api: undefined,
        cellStartedEdit: true,
        onKeyDown: undefined,
        context: undefined,
        $scope: undefined,
        stopEditing: undefined,
        eGridCell: undefined,
        parseValue: undefined,
        formatValue: undefined,
        skyComponentProperties: {
          maxlength: undefined,
        },
      };
      textEditorFixture.detectChanges();

      expect(textEditorComponent.editorForm.get('text').value).toBeNull();

      textEditorComponent.agInit(cellEditorParams);

      expect(textEditorComponent.editorForm.get('text').value).toBe('testing');
    });

    it('initializes with the character pressed when a standard keyboard event triggers the edit', () => {
      const value = 'testing';
      const columnWidth = 100;
      const column = new Column(
        {
          colId: 'col',
        },
        undefined,
        'col',
        true
      );

      column.setActualWidth(columnWidth);

      const cellEditorParams: SkyCellEditorTextParams = {
        value,
        colDef: { headerName: 'Test text cell' },
        rowIndex: 1,
        column,
        node: undefined,
        keyPress: undefined,
        charPress: 'a',
        columnApi: undefined,
        data: undefined,
        api: undefined,
        cellStartedEdit: true,
        onKeyDown: undefined,
        context: undefined,
        $scope: undefined,
        stopEditing: undefined,
        eGridCell: undefined,
        parseValue: undefined,
        formatValue: undefined,
        skyComponentProperties: {
          maxlength: undefined,
        },
      };
      textEditorFixture.detectChanges();

      expect(textEditorComponent.editorForm.get('text').value).toBeNull();

      textEditorComponent.agInit(cellEditorParams);

      expect(textEditorComponent.editorForm.get('text').value).toBe('a');
    });
  });

  describe('getValue', () => {
    it('returns the value if it is set', () => {
      const value = 'cat';
      textEditorComponent.editorForm.get('text').setValue(value);

      textEditorFixture.detectChanges();

      expect(textEditorComponent.getValue()).toBe(value);
    });

    describe('afterGuiAttached', () => {
      it('focuses on the input after it attaches to the DOM', () => {
        textEditorFixture.detectChanges();

        const input = textEditorNativeElement.querySelector('input');
        spyOn(input, 'focus');

        textEditorComponent.afterGuiAttached();

        expect(input).toBeVisible();
        expect(input.focus).toHaveBeenCalled();
      });

      it('does not select the input value if Backspace triggers the edit', () => {
        const value = 'testing';
        const columnWidth = 100;
        const column = new Column(
          {
            colId: 'col',
          },
          undefined,
          'col',
          true
        );

        column.setActualWidth(columnWidth);

        const cellEditorParams: SkyCellEditorTextParams = {
          value,
          colDef: { headerName: 'Test text cell' },
          rowIndex: 1,
          column,
          node: undefined,
          keyPress: KeyCode.BACKSPACE,
          charPress: undefined,
          columnApi: undefined,
          data: undefined,
          api: undefined,
          cellStartedEdit: true,
          onKeyDown: undefined,
          context: undefined,
          $scope: undefined,
          stopEditing: undefined,
          eGridCell: undefined,
          parseValue: undefined,
          formatValue: undefined,
          skyComponentProperties: {
            maxlength: undefined,
          },
        };
        textEditorFixture.detectChanges();

        textEditorComponent.agInit(cellEditorParams);
        textEditorFixture.detectChanges();
        const input = textEditorNativeElement.querySelector('input');
        const selectSpy = spyOn(input, 'select');

        textEditorComponent.afterGuiAttached();

        expect(input.value).toBe('');
        expect(selectSpy).not.toHaveBeenCalled();
      });

      it('does not select the input value if Escape triggers the edit', () => {
        const value = 'testing';
        const columnWidth = 100;
        const column = new Column(
          {
            colId: 'col',
          },
          undefined,
          'col',
          true
        );

        column.setActualWidth(columnWidth);

        const cellEditorParams: SkyCellEditorTextParams = {
          value,
          colDef: { headerName: 'Test text cell' },
          rowIndex: 1,
          column,
          node: undefined,
          keyPress: KeyCode.BACKSPACE,
          charPress: undefined,
          columnApi: undefined,
          data: undefined,
          api: undefined,
          cellStartedEdit: true,
          onKeyDown: undefined,
          context: undefined,
          $scope: undefined,
          stopEditing: undefined,
          eGridCell: undefined,
          parseValue: undefined,
          formatValue: undefined,
          skyComponentProperties: {
            maxlength: undefined,
          },
        };
        textEditorFixture.detectChanges();

        textEditorComponent.agInit(cellEditorParams);
        textEditorFixture.detectChanges();
        const input = textEditorNativeElement.querySelector('input');
        const selectSpy = spyOn(input, 'select');

        textEditorComponent.afterGuiAttached();

        expect(input.value).toBe('');
        expect(selectSpy).not.toHaveBeenCalled();
      });

      it('does not select the input value if F2 triggers the edit', () => {
        const value = 'testing';
        const columnWidth = 100;
        const column = new Column(
          {
            colId: 'col',
          },
          undefined,
          'col',
          true
        );

        column.setActualWidth(columnWidth);

        const cellEditorParams: SkyCellEditorTextParams = {
          value,
          colDef: { headerName: 'Test text cell' },
          rowIndex: 1,
          column,
          node: undefined,
          keyPress: KeyCode.F2,
          charPress: undefined,
          columnApi: undefined,
          data: undefined,
          api: undefined,
          cellStartedEdit: true,
          onKeyDown: undefined,
          context: undefined,
          $scope: undefined,
          stopEditing: undefined,
          eGridCell: undefined,
          parseValue: undefined,
          formatValue: undefined,
          skyComponentProperties: {
            maxlength: undefined,
          },
        };
        textEditorFixture.detectChanges();

        textEditorComponent.agInit(cellEditorParams);
        textEditorFixture.detectChanges();
        const input = textEditorNativeElement.querySelector('input');
        const selectSpy = spyOn(input, 'select');

        textEditorComponent.afterGuiAttached();

        expect(input.value).toBe('testing');
        expect(selectSpy).not.toHaveBeenCalled();
      });

      it('selects the input value if Enter triggers the edit', () => {
        const value = 'testing';
        const columnWidth = 100;
        const column = new Column(
          {
            colId: 'col',
          },
          undefined,
          'col',
          true
        );

        column.setActualWidth(columnWidth);

        const cellEditorParams: SkyCellEditorTextParams = {
          value,
          colDef: { headerName: 'Test text cell' },
          rowIndex: 1,
          column,
          node: undefined,
          keyPress: KeyCode.ENTER,
          charPress: undefined,
          columnApi: undefined,
          data: undefined,
          api: undefined,
          cellStartedEdit: true,
          onKeyDown: undefined,
          context: undefined,
          $scope: undefined,
          stopEditing: undefined,
          eGridCell: undefined,
          parseValue: undefined,
          formatValue: undefined,
          skyComponentProperties: {
            maxlength: undefined,
          },
        };
        textEditorFixture.detectChanges();

        textEditorComponent.agInit(cellEditorParams);
        textEditorFixture.detectChanges();
        const input = textEditorNativeElement.querySelector('input');
        const selectSpy = spyOn(input, 'select');

        textEditorComponent.afterGuiAttached();

        expect(input.value).toBe('testing');
        expect(selectSpy).toHaveBeenCalled();
      });

      it('does not select the input value when a standard keyboard event triggers the edit', () => {
        const value = 'testing';
        const columnWidth = 100;
        const column = new Column(
          {
            colId: 'col',
          },
          undefined,
          'col',
          true
        );

        column.setActualWidth(columnWidth);

        const cellEditorParams: SkyCellEditorTextParams = {
          value,
          colDef: { headerName: 'Test text cell' },
          rowIndex: 1,
          column,
          node: undefined,
          keyPress: undefined,
          charPress: 'a',
          columnApi: undefined,
          data: undefined,
          api: undefined,
          cellStartedEdit: true,
          onKeyDown: undefined,
          context: undefined,
          $scope: undefined,
          stopEditing: undefined,
          eGridCell: undefined,
          parseValue: undefined,
          formatValue: undefined,
          skyComponentProperties: {
            maxlength: undefined,
          },
        };
        textEditorFixture.detectChanges();

        textEditorComponent.agInit(cellEditorParams);
        textEditorFixture.detectChanges();
        const input = textEditorNativeElement.querySelector('input');
        const selectSpy = spyOn(input, 'select');

        textEditorComponent.afterGuiAttached();

        expect(input.value).toBe('a');
        expect(selectSpy).not.toHaveBeenCalled();
      });
    });

    it('returns undefined if the value is not set', () => {
      expect(textEditorComponent.getValue()).toBeUndefined();
    });
  });

  it('should pass accessibility', async () => {
    textEditorFixture.detectChanges();
    await textEditorFixture.whenStable();

    await expectAsync(textEditorFixture.nativeElement).toBeAccessible();
  });
});
