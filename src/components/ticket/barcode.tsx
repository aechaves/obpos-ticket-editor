import React from 'react'

export type BarcodeProps = {
  type?: 'EAN13' | 'CODE128' | 'CODE39'
  /*
  EAN13: Prints EAN13 barcode
  CODE128: Prints CODE128 barcode
  CODE39: Prints CODE39 barcode. This barcode type is only available in JavaPOS printer
  */
  position?: 'top' | 'bottom' | 'none'
  /*
  top: Locates the barcode label on to the top of the barcode.
  bottom: Locates the barcode label on the bottom of the barcode.
  none: Does not print the barcode label.
  */
}

const barcode: React.FunctionComponent<BarcodeProps> = (props) => {
  // TODO handle props, children is a string with the barcode
  // TODO render the barcode
  return (
    <div>
      Barcodes are not supported yet
    </div>
  )
}

export default barcode;


