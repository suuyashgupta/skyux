import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { SkyLibResourcesService } from '@skyux/i18n';

import { SkyFileSizePipe } from './file-size.pipe';
import { FileAttachmentTestModule } from './fixtures/file-attachment.module.fixture';

describe('File size pipe', () => {
  let fileSizePipe: SkyFileSizePipe;
  let decimalPipe: DecimalPipe;

  function validateFormatted(
    value: number,
    expected: string,
    newFileSizePipe: SkyFileSizePipe
  ) {
    const result = newFileSizePipe.transform(value);

    expect(result).toBe(expected);
  }

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [FileAttachmentTestModule],
    });

    decimalPipe = new DecimalPipe('en');
    fileSizePipe = new SkyFileSizePipe(
      decimalPipe,
      TestBed.get(SkyLibResourcesService)
    );
  });

  it('should format bytes', function () {
    validateFormatted(1, '1 byte', fileSizePipe);
    validateFormatted(100, '100 bytes', fileSizePipe);
    validateFormatted(999, '999 bytes', fileSizePipe);
  });

  it('should format kilobytes', function () {
    validateFormatted(1000, '1 KB', fileSizePipe);
    validateFormatted(100000, '100 KB', fileSizePipe);
    validateFormatted(999999, '999 KB', fileSizePipe);
  });

  it('should format magabytes', function () {
    validateFormatted(1000000, '1 MB', fileSizePipe);
    validateFormatted(1900000, '1.9 MB', fileSizePipe);
    validateFormatted(100000000, '100 MB', fileSizePipe);
    validateFormatted(999999999, '999.9 MB', fileSizePipe);
  });

  it('should format gigabytes', function () {
    validateFormatted(1000000000, '1 GB', fileSizePipe);
    validateFormatted(100000000000, '100 GB', fileSizePipe);
    validateFormatted(999999999999, '999.9 GB', fileSizePipe);
  });

  it('should format values over 1,000 gigabytes as gigabytes', function () {
    validateFormatted(1000000000000, '1,000 GB', fileSizePipe);
    validateFormatted(9999999999999, '9,999.9 GB', fileSizePipe);
  });

  it('should return an empty string when the input is null or undefined', function () {
    validateFormatted(undefined, '', fileSizePipe);
    validateFormatted(null, '', fileSizePipe);
  });
});
