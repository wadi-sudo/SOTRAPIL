<?php
    header('Content-Type: application/json');
	system('ipconfig/all');
	$a = ob_get_content();
	ob_clean();
	$mac = substr($a, (strpos($a,"Physical")+36),17);





    

    if( !isset($_POST['functionname']) ) { $mac['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $mac['error'] = 'No function arguments!'; }

    if( !isset($mac['error']) ) {

        switch($_POST['functionname']) {
            case 'add':
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                   $mac['error'] = 'Error in arguments!';
               }
               else {
                   $mac['result'] = add(floatval($_POST['arguments'][0]), floatval($_POST['arguments'][1]));
               }
               break;

            default:
               $mac['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    echo json_encode($mac);
?>