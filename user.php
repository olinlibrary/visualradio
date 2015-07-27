<?php

class User {

	function loginForm($f3){

		echo Template::instance()->render('templates/header.html');
		echo Template::instance()->render('templates/login.html');
	}

	function loginPost($f3){
		$auth = new \Auth('smtp', array('scheme'=>'tls', 'host'=>'smtps.olin.edu', 'port'=>587));
		if(!$auth->login($f3->get('POST.username').'@olin.edu', $f3->get('POST.password')))
			throw new \Exception('Invalid Credentials');
			
		$f3->set('SESSION.un', $f3->get('POST.username'));
		echo "<script type='text/javascript'>window.location.href = '/channels';</script>";
	}

}
