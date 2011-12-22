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

  protected function _initRoutes()
  {
      $front = Zend_Controller_Front::getInstance();
      $router = $front->getRouter();

      $dynamic = new Zend_Controller_Router_Route(
            '/a/:variable1',
            array(
                'controller' => 'index',
                'action'     => 'index'),
                array('variable1' => '^[a-zA-Z0-9_]*$')
            );

      $static = new Zend_Controller_Router_Route_Static(
            'nice-looking-url-hello-world-seo',
            array(
                'controller' => 'index',
                'action' => 'add'
            ));
      
      $static1 = new Zend_Controller_Router_Route_Static(
            '/1/downloads.txt',
            array(
                'controller' => 'bart',
                'action'    => 'ivvr'
            ));      

      $regex = new Zend_Controller_Router_Route_Regex(
                'admin/(\d+)',
                array(
                    'controller' => 'index',
                    'action' => 'index'
                ),
                array(
                  1 => 'request'
                )
            );

      $route = new Zend_Controller_Router_Route_Regex(
              'blog/a/(\d+)-(.+)\.html',
              array(
                  'controller' => 'index',
                  'action'     => 'index'
              ),
              array(
                  1 => 'id',
                  2 => 'description'
              ),
              'blog/a/%d-%s.html'
      );

      // Add all of them
      $router->addRoute('dynamic', $dynamic);      
      $router->addRoute('static' , $static);
      $router->addRoute('static1' , $static1);      
      $router->addRoute('regex'  , $regex);
      $router->addRoute('blogArchive', $route);
  }

}
