* Support rendering images and barcode (use placeholders first)
* Support the display (http://wiki.openbravo.com/wiki/Retail:Developers_Guide/ReceiptDisplayDocuments)
* Ignore the opendrawer tag ( no op component?)
* Improve rendering of some components
* Deploy a webapp
* Allow loading WEB POS AD_MESSAGE_TRL.xml for translated labels
* Allow loading extra (custom) AD_MESSAGE.xml files for more labels, or have a UI to add manually some labels
* link to github for issues
* Support <qr> tag (renders a text as a QR code)
* Support for XML autocompletion and syntax checking (preferably a customo one dedicated to ticket xml) in monaco. See: https://github.com/isimic413/monaco-editor-custom-intellisense/blob/ed6013fa8ef67548dba5d753ae6adf97d41cc85d/sample-editor/completion-provider.js#L222 and https://mono.software/2017/04/11/custom-intellisense-with-monaco-editor/
* Restrict tag hierarchy (for example, output tag is required, text should be inside of line, a plain string does not render)
* Use html-to-canvas or similar to allow downloading a full picture of the preview
* Translations

Useful links:
http://wiki.openbravo.com/wiki/Retail:Developers_Guide/Receipt_and_Customer_display_documents
http://wiki.openbravo.com/wiki/Retail:Developers_Guide/Javascript_template_engine_for_receipt_printer_and_customer_displays_documents
http://wiki.openbravo.com/wiki/Retail:Developers_Guide/New_Javascript_template_engine_for_receipt_printer_and_customer_displays_documents
https://github.com/TroyAlford/react-jsx-parser
