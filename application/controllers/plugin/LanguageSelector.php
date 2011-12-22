<?php

class LanguageSelector extends Zend_Controller_Plugin_Abstract
{

  /* Language & Core - track */
  public function preDispatch(Zend_Controller_Request_Abstract $request)
  {
    //$registry = Zend_Registry::getInstance();
    //$translate = $registry->get('Zend_Translate');
    //$session = new Zend_Session_Namespace('session');
    //$lang = $request->getParam('lang','');
    //$translate->setLocale($language);    // en_US
    //$translate->setLocale('en_US');
    
    Zend_Session::start();
    $mysession = new Zend_Session_Namespace('mysession');

    if (isset($mysession->rows['groups']))
    {
      $member =  $mysession->rows;
      
    } else {

      $out = 0;

      /* Firewall - not allowed without login to other controllers 
       * 
       * - to allow a controller use: case 'controller name': out = 1 ; break; 
       */
      switch ($this->getRequest()->getControllerName())
      {
        case 'index':       $out = 1;         break;

        case 'conference':  $out = 1;         break;
        
        case 'ajax':        $out = 1;         break;
                
        case 'test':        $out = 1;         break;
        
        case '1':           $out = 1;         break;
        
        case 'license':     $out = 1;         break;
        
        case 'client':      $out = 1;         break;
        case 'server':      $out = 1;         break;
        case 'cs':          $out = 1;         break;
        
        case 'agent':       $out = 1;         break;
        case 'kiosk':       $out = 1;         break;
        case 'aviccs':      $out = 1;         break;
        
        case 'admin':       $out = 1;         break;
        
        case 'register':       $out = 1;         break;
        
        default: $out=1; break;
        
      }

      if ($out !=1)
      {
          $redirector = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');
          $redirector->gotoSimple('index', 'index');
          //echo 'test error';
      }


    }

  }


  public function routeStartup(Zend_Controller_Request_Abstract $request)
  {
  }

  public function routeShutdown(Zend_Controller_Request_Abstract $request)
  {
  }

  public function dispatchLoopStartup( Zend_Controller_Request_Abstract $request)
  {
  }

  public function postDispatch(Zend_Controller_Request_Abstract $request)
  {
  }

  public function dispatchLoopShutdown()
  {
  }

}


?>
