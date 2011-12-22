<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
  protected function _initTranslate()
  {
    $registry = Zend_Registry::getInstance();
    $locale = new Zend_Locale('en_US');
    //$translate = new Zend_Translate('gettext', APPLICATION_PATH . DIRECTORY_SEPARATOR .'languages/en.mo', 'en_US');
    //$translate->addTranslation( APPLICATION_PATH . DIRECTORY_SEPARATOR .'languages/nl.mo', 'nl_NL');
    $registry->set('Zend_Locale', $locale);
    //$registry->set('Zend_Translate', $translate);
    return $registry;
  }
  
  protected function _initPdispatch()
  {
    $this->bootstrap('frontController');
    require_once APPLICATION_PATH . '/controllers/plugin/LanguageSelector.php';
    $plugin = new LanguageSelector();
    $front = Zend_Controller_Front::getInstance();
    $front->registerPlugin($plugin);
    return $plugin;
  }
  
  protected function _initHead()
  {
    $this->bootstrap('view');
    $view = $this->getResource('view');
    $view->doctype('XHTML1_STRICT');
		//$view->headLink()->appendStylesheet('/css/global.css');
    $view->HeadScript()->appendFile('/js/jquery.min.js')->setIndent(8);
    $view->HeadScript()->appendFile('/js/jquery.ui.min.js')->setIndent(8);    
    $view->HeadScript()->appendFile('/js/jquery.corner.js')->setIndent(8);
    $view->HeadScript()->appendFile('/js/jquery.shadow.pack.js')->setIndent(8);
    $view->HeadScript()->appendFile('/js/jquery.sparkline.min.js')->setIndent(8);
    //$view->HeadScript()->appendFile('/js/boot/vz.lib.js')->setIndent(8);
    //$view->HeadScript()->appendFile('/js/boot/frontpage.js')->setIndent(8);
    $view->HeadScript()->appendFile('/js/jquery.getimagedata.min.js');    
    ZendX_JQuery::enableView($view);

    //Zend_Session::rememberMe(60);
    //Zend_Session::rememberMe(864000);
    Zend_Session::start();

    $mysession = new Zend_Session_Namespace('mysession');

    if (isset($mysession->rows['group'])) 
     {
      $view->member =  $mysession->rows;
      $view->mydata = (object) $mysession->rows;
      $view->datas   = (object) $view->member;
      // $view->mydata = (object) $view->member;
      $view->mydata   = (object) $view->member;
    }

  }

  protected function _initAutoloading()
  {
    $loader = new Zend_Loader_Autoloader_Resource(array(
        'basePath'  => APPLICATION_PATH, 
        'namespace' => 'My',
        ));
    $loader->addResourceType('form', 'forms', 'Form');
    $loader->addResourceType('module','modules','Module');
  }

  protected  function _initRoutes()
  {
         
    $front = Zend_Controller_Front::getInstance();
    $router = $front->getRouter();
//    $dynamic1 = new Zend_Controller_Router_Route(
//          '/:variable1',
//          array(
//                'controller' => 'router',
//              ),
//              array('variable1' => '^[a-zA-Z0-9_]*$')
//          );
//    $router->addRoute('dynamic1', $dynamic1); 

    $dynamic2 = new Zend_Controller_Router_Route(
          '/',
          array(
                'controller' => 'index',
                'action'     => 'index'
              )
          );
    $router->addRoute('dynamic2', $dynamic2);

    /* Hidden tools */
    $static1 = new Zend_Controller_Router_Route_Static(
              'rss.xml',
              array(
                'controller'  => 'index',
                'action'      => 'rss'
          ));
    $router->addRoute('static1' , $static1);

    $static2 = new Zend_Controller_Router_Route_Static(
        'sitemap.xml',
        array(
            'controller' => 'index',
            'action' => 'sitemap'
        ));
    $router->addRoute('static2' , $static2);

    /* Static - Profile */
    $sta1 = new Zend_Controller_Router_Route_Static(
          '/profile',
          array(
                'controller' => 'profile',
                'action'=>'index'
              )
          );
    $router->addRoute('sta1', $sta1); 

    $fixed1 = new Zend_Controller_Router_Route(
          '/profile/:variable1',
          array(
                'controller' => 'profile'
              ),
              array('variable1' => '^[a-zA-Z0-9_]*$')
          );
    $router->addRoute('fixed1', $fixed1);        

    /* Static - Login */
    $s2 = new Zend_Controller_Router_Route_Static(
          '/login',
          array(
                'controller' => 'login',
                'action'=>'index'
              )
          );
    $router->addRoute('s2', $s2); 

    /* Static - Inbox */
    $s3 = new Zend_Controller_Router_Route_Static(
          '/inbox',
          array(
                'controller' => 'inbox',
                'action'=>'index'
              )
          );
    $router->addRoute('s3', $s3); 

    /* Static - Contacts */
    $s4 = new Zend_Controller_Router_Route_Static(
          '/contacts',
          array(
                'controller' => 'contacts',
                'action'=>'index'
              )
          );
    $router->addRoute('s4', $s4); 

    /* Static - Profile */
    $s5 = new Zend_Controller_Router_Route_Static(
          '/profile',
          array(
                'controller' => 'profile',
                'action'=>'index'
              )
          );
    $router->addRoute('s5', $s5); 

    /* Static - About */
    $s6 = new Zend_Controller_Router_Route_Static(
          '/about',
          array(
                'controller' => 'about',
                'action'=>'index'
              )
          );
    $router->addRoute('s6', $s6); 

    /* Static - feedback */
    $s7 = new Zend_Controller_Router_Route_Static(
          '/feedback',
          array(
                'controller' => 'feedback',
                'action'=>'index'
              )
          );
    $router->addRoute('s7', $s7);        

    /**
      * Subdomain
      * 
      * m.domain.com where :m is a subdomain name
      * we use this subdomain in indexcontroller
      * from this subdomain we manage the routing plan
      * for specific subdomain lists
      *
      */
      /* Subdomain part 1: carry variables */
      $path_route = new Zend_Controller_Router_Route(
        ':controller/:action/*',
        array(
          'controller' => 'index',
          'action'     => 'index',
        )
      );

      /* Subdomain part 2: How do you get the subdomain as variable to track later ?*/
      $dynamic_subdomain = new Zend_Controller_Router_Route_Hostname(
              ':subdomain.xxx.com',
              NULL,
              array(
                  'subdomain' => '([a-zA-Z]+)'
              )
          );
      $router->addRoute('subdomain_route', $dynamic_subdomain->chain($path_route));      
  }
  
}
