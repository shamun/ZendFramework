<?php
/**
 * Protocol Specification Version 0.2.2
 *
 * This source file is subject to all the agents and customers 
 * message protocol
 * Any updates for this protocol will make issue with Frontend
 * applications.
 * 
 * Please change with your own risk. 
 * Advised to backup first the working model.
 * 
 * @category   Community 
 * @package    Startagig
 * @copyright  Copyright (c) 2011 Teleportel NV (http://www.teleportel.com)
 * @version    0.2.2
 * 
 * 
 * Ref:
 * 
 */
class StartagigController extends Zend_Controller_Action
{

    /**
     * Centralized Database instance
     */
    private $db = null;
    /**
     * Centralized Data arival 
     */
    private $data = null;
    
    /**
     * Startup protocol
     * 
     * @uses Initialize all the controller packets header
     *       allow the incoming GET/POST protocol requests to be instance
     * @return void
     */
    public function init()
    {
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender();
        $this->db = Application_Model_Db::db_load();
        /**
         * Currently we are using GET not the POST protocol 
         */
        //$post = $this->getRequest()->getPost();
        $post = $this->getRequest()->getQuery();
        $this->data = (object) $post;
        if ($this->view->member->group=='agent') {
          $this->data->username=$this->view->member->username;
          $this->data->password=$this->view->member->password;
        }
        
        unset ($post);

        
    }

}

?>
