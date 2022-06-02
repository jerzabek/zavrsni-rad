<?php

const SCHEMA_ORG_TYPES_URL      = "https://schema.org/version/latest/schemaorg-current-https-types.csv";
const SCHEMA_ORG_TYPES_CSV_PATH = __DIR__ . '/schemaorg-current-https-types.csv';
const SCHEMA_ORG_TYPES_JSON_PATH = '../src/schema.types.json';

const SCHEMA_ORG_PROPERTIES_URL = "https://schema.org/version/latest/schemaorg-current-https-properties.csv";
const SCHEMA_ORG_PROPERTIES_CSV_PATH = __DIR__ . '/schemaorg-current-https-properties.csv';
const SCHEMA_ORG_PROPERTIES_JSON_PATH = '../src/schema.props.json';

/**
 * Parses Schema.org CSV files containing the different Schema types.
 */
function parse_types_csv($typesCsvPath, $jsonPath)
{
  $schemaTree = array();

  if (($handle = fopen($typesCsvPath, "r")) !== FALSE) {
    $data = fgetcsv($handle);

    $columns = $data;

    while (($data = fgetcsv($handle)) !== FALSE) {
      $num = count($data);
      $temp = array();

      for ($c = 0; $c < $num; $c++) {
        $key = $columns[$c];

        if ($key === 'id') {
          $temp['value'] = $data[$c];
        } else if ($key === 'label') {
          $temp['label'] = $data[$c];
        } else if ($key === 'comment') {
          // We must ensure the URLs lead to the correct host.
          $comment = $data[$c];
          $comment = str_replace("href=\"/", "href=\"https://schema.org/", $comment);

          $temp['comment'] = $comment;
        } else {
          continue;
        }
      }

      $schemaTree[] = $temp;
    }

    fclose($handle);
  }

  // We do not wish to escape / slashes in the URLs
  $file_store_result = file_put_contents($jsonPath, json_encode($schemaTree, JSON_UNESCAPED_SLASHES));

  if ($file_store_result) {
    echo "Successfully stored types JSON file.\n";
  } else {
    echo "Could not store types JSON file.\n";
  }
}

/**
 * Parses Schema.org CSV files containing the different Schema properties.
 */
function parse_properties_csv($propertiesCsvPath, $jsonPropertiesPath)
{
  $propertiesSchemaTree = array();

  if (($handle = fopen($propertiesCsvPath, "r")) !== FALSE) {
    $data = fgetcsv($handle);

    $columns = $data;

    while (($data = fgetcsv($handle)) !== FALSE) {
      $num = count($data);
      $temp = array();

      for ($c = 0; $c < $num; $c++) {
        $key = $columns[$c];

        if ($key === 'id') {
          $temp['value'] = $data[$c];
        } else if ($key === 'label') {
          $temp['label'] = $data[$c];
        } else if ($key === 'comment') {
          // We must ensure the URLs lead to the correct host.
          $comment = $data[$c];
          $comment = str_replace("href=\"/", "href=\"https://schema.org/", $comment);

          $temp['comment'] = $comment;
        } else {
          continue;
        }
      }

      $propertiesSchemaTree[] = $temp;
    }
    fclose($handle);
  }

  // We do not wish to escape / slashes in the URLs
  $file_store_result = file_put_contents($jsonPropertiesPath, json_encode($propertiesSchemaTree, JSON_UNESCAPED_SLASHES));

  if ($file_store_result) {
    echo "Successfully stored properties JSON file.\n";
  } else {
    echo "Could not store properties JSON file.\n";
  }
}

// =========================================== Checking TYPES CSV file status =========================================== 
if (!file_exists(SCHEMA_ORG_TYPES_CSV_PATH)) {
  echo "Types CSV file does not exist. Downloading.\n";

  $downloadStatus = file_put_contents(SCHEMA_ORG_TYPES_CSV_PATH, file_get_contents(SCHEMA_ORG_TYPES_URL));

  if ($downloadStatus) {
    echo "Types CSV file downloaded successfully.\n";
  } else {
    echo "Types CSV could not be downloaded. Terminating...\n";
    exit(1);
  }
} else {
  echo "Types CSV file exists.\n";
}


// =========================================== Checking PROPERTIES CSV file status =========================================== 
if (!file_exists(SCHEMA_ORG_PROPERTIES_CSV_PATH)) {
  echo "Properties CSV file does not exist. Downloading.\n";

  $downloadStatus = file_put_contents(SCHEMA_ORG_PROPERTIES_CSV_PATH, file_get_contents(SCHEMA_ORG_PROPERTIES_URL));

  if ($downloadStatus) {
    echo "Properties CSV file downloaded successfully.\n";
  } else {
    echo "Properties CSV could not be downloaded. Terminating...\n";
    exit(1);
  }
} else {
  echo "Properties CSV file exists.\n";
}

// =========================================== Checking TYPES JSON file status =========================================== 
if (!file_exists(SCHEMA_ORG_TYPES_JSON_PATH)) {
  echo "Types JSON file does not exist. Generating.\n";
  parse_types_csv(SCHEMA_ORG_TYPES_CSV_PATH, SCHEMA_ORG_TYPES_JSON_PATH);
} else {
  echo "Types JSON file does exists.\n";
}

// =========================================== Checking PROPERTIES JSON file status =========================================== 
if (!file_exists(SCHEMA_ORG_PROPERTIES_JSON_PATH)) {
  echo "Properties JSON file does not exist. Generating.\n";
  parse_properties_csv(SCHEMA_ORG_PROPERTIES_CSV_PATH, SCHEMA_ORG_PROPERTIES_JSON_PATH);
} else {
  echo "Properties JSON file does exists.\n";
}

echo "Finished.\n";
