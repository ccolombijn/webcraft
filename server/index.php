<?php
$root = $_SERVER['DOCUMENT_ROOT'];
chdir($root);
$path = '/'.ltrim(parse_url($_SERVER['REQUEST_URI'])['path'],'/');

// Do some URL rewriting
if (preg_match('/\/([_0-9a-zA-Z-]+\/)?(.*)/', $path, $matches)) {
  $path = '/' . $matches[2];
  if (file_exists($root . $path) && !strpos($path, ".php")) {
    // The rewritten path is to a non-PHP file.  It's probably a static asset
    // or theme asset.  Load the file and return it.
    header("Content-Type: " . mime_content_type($path));
    return readfile($root . $path);
  }
}

if (preg_match('/\/([_0-9a-zA-Z-]+\/)?(.*\.php)$/', $path, $matches)) {
  // The path is to some PHP file.  Remove the leading blog prefix.
  // Logic below will load this PHP file.
  $path = '/' . $matches[2];
}

set_include_path(get_include_path().':'.__DIR__);
if (file_exists($root.$path)) {
  if (is_dir($root.$path) && substr($path,strlen($path) - 1, 1) !== '/')
    $path = rtrim($path,'/').'/index.php';
  if (strpos($path,'.php') === false)
    return false;
  else {
    chdir(dirname($root.$path));
    require_once $root.$path;
  }
} else include_once 'index.php';
