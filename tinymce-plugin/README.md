# TinyMCE "Zavrad" Plugin

## Build:

To build a distributable version of the plugin you must run the following command:

```
yarn build
```
A minified javascript bundle will be generated in the `tinymce_plugin/dist/zavrad` folder.

## Building Schema.org data

Schema.org information is stored in four files

  - tinymce_plugin/schemaorg-datasource/schemaorg-current-https-properties.csv
  - tinymce_plugin/schemaorg-datasource/schemaorg-current-https-types.csv
  - tinymce_plugin/src/schema.props.json
  - tinymce_plugin/src/schema.types.json

The data is downloaded from the Schema.org website in CSV format and formatted into appropriate JSON format using a PHP script.
If you wish to update the Schema.org data the plugin can work with you must remove the aforementioned files and run the following code:

```
cd tinymce_plugin/schemaorg-datasource/
php build-schema.php
```


## Launch example:

Using `http-server` library a demo can plugin demo can be launched.

```
yarn build
yarn add http-server
cd src/demo/html
http-server
```