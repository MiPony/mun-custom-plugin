<?php


spl_autoload_register('mun_autoloader');
function mun_autoloader($class)
{
    $namespace = 'wo_schedule\inc';

    if (strpos($class, $namespace) !== 0) {
        return;
    }

    $class = str_replace($namespace, '', $class);
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';

    $directory = plugin_dir_path(__FILE__);
    $path = $directory . $class;

    if (file_exists($path)) {
        require_once($path);
    }
}