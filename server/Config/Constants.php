<?php 

class Constants{
	
	public $google_clien_id = '456611571672-70qen3mp1qlmr47majuiboc8bmo2o3id.apps.googleusercontent.com';
	
	public $channelId;
	public $password;
	function __construct(){
		$this->channelId = 'ramanapi123';
		$this->password = md5('password');
	}

	
}


?>