/*
 * 
 * Mocks incapsulated in this config literal. There are mocks for document and for navigator.
 * 
 */
window.TEST ={
	
	config : {
		noredirection_param : "noredirection",
	
		mobile_prefix : "m",
		
		beforeredirection_callback : ""
	},
	
	sessionStorage : {	
		item : "",
		
		getItem : function(name) {
			return window.TEST.sessionStorage.name;
		},
		
		setItem : function(name, value) {
			window.TEST.sessionStorage.name = value;
		}	
	},
	
	
	mockDocument: {
		location : {
			protocol : "http:",
			href : "http://domain.com/test",
			host  : "domain.com",
			pathname : "",
			search : ""
		},
		
		cookie : "",
		
		referrer : ""
	},
	
	mockIphoneNavigator : {
		userAgent : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16"
	},
	
	mockIpadNavigator : {
		userAgent : "Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10"
	},
	
	mockAndroidNavigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 0.5; en-us) AppleWebKit/522+ (KHTML, like Gecko) Safari/41"
	},
	
	mockFFDesktopNavigator : {
		userAgent : "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.6) Gecko/20100629 Firefox/3.6 ( .NET CLR 3.5.30729)"
	},
	
	mockHTCdesireNavigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 2.2; es-es; HTC Desire HD 1.39.161.1 Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
	},
	
	mockSamsungTabNavigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1	"
	},
	
	mockHtcNavigator : {
		userAgent : "HTC-3470/1.2 Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Tablet PC 1.7; .NET CLR 2.0.50727; InfoPath.2)"
	}
	
};

module("Redirection happening");
 
test ('iPhoneRedirection()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.noredirection_param = "";
	window.TEST.mockDocument.referrer = "http://domain.com";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator,  window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for iPhone not happening");
	ok (window.TEST.mockDocument.cookie.indexOf("_referrer=http://domain.com")>-1, "Referrer not copied to cookie");
})

test ('AndroidRedirection()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.noredirection_param = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockAndroidNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for Android not happening");
})

test ('HTCRedirection()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.noredirection_param = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHTCdesireNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for Android not happening");
})

test ('WWWRedirection()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.noredirection_param = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection not happening");
})

test ('RedirectionTo.mobi()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.domain.mobi";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.mobi", "Redirection to www.domain.mobi not happening");
})

test ('RedirectionTo/m()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.domain.com/m";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/m", "Redirection to http://www.domain.com/m not happening");
})

test ('RedirectionTomobile()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_prefix = "mobile";
	window.TEST.config.mobile_url = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://mobile.domain.com", "Redirection to  mobile.domain.com not happening");
})

test ('RedirectionToDifferentUrl()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_prefix = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.whatever.com/example", "Redirection to http://www.whatever.com/example not happening");
})

test ('RedirectionToHttpstUrl()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "";
	window.TEST.config.mobile_scheme = "https";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "https://m.domain.com", "Redirection to https://m.domain.com not happening");
})

test ('RedirectionToParametertUrl()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.search = "?id=111";
	window.TEST.mockDocument.location.pathname = "/mail/";
	window.TEST.config.mobile_scheme = "http";
	window.TEST.config.mobile_url = "m.domain.com";
	window.TEST.config.keep_path = true;
	window.TEST.config.keep_query = true;
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com/mail/?id=111", "Redirection to https://m.domain.com not happening");
})

test ('RedirectionIpad()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.search = "";
	window.TEST.mockDocument.location.pathname = "";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_scheme = "https";
	window.TEST.config.tablet_redirection = "true";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "https://www.whatever.com/example", "Redirection to https://m.domain.com not happening");
})

test ('RedirectionHtc()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_scheme = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHtcNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.whatever.com/example", "Redirection to https://m.domain.com not happening");
})

test ('RedirectionSamsungTab()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_scheme = "https";
	window.TEST.config.tablet_redirection = "true";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockSamsungTabNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "https://www.whatever.com/example", "Redirection to https://m.domain.com not happening");
})

test ('RedirectionIpadBecauseOfCallback()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_scheme = "https";
	window.TEST.config.tablet_redirection = "true";
	window.TEST.config.beforeredirection_callback = (function(){return true ;});
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "https://www.whatever.com/example", "Redirection to https://m.domain.com not happening");
})

test ('RedirectionTabletAndMobileUrl()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "m.whatever.com";
	window.TEST.config.mobile_scheme = "https";
	window.TEST.config.tablet_url = "tablet.whatever.com";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "https://tablet.whatever.com", "Redirection to https://tablet.whatever.com not happening");
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHtcNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "https://m.whatever.com", "Redirection to https://m.domain.com not happening");
})

test ('RedirectionKeepPathAndQuery()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.pathname = "/path1";
	window.TEST.mockDocument.location.search = "?a=b";
	window.TEST.config.mobile_url = "m.whatever.com";
	window.TEST.config.mobile_scheme = "";
	window.TEST.config.keep_path = true;
	window.TEST.config.keep_query = true;
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHtcNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.whatever.com/path1?a=b", "Redirection to https://m.domain.com not happening");
})

module("Redirection not happening");

test ('RedirectionFromMobileToStandardVersion()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.noredirection_param = "";
	window.TEST.config.mobile_prefix = "mobile";
	window.TEST.config.mobile_url = "";
	window.TEST.config.mobile_scheme = "";
	window.TEST.mockDocument.cookie = "";
	window.TEST.mockDocument.referrer = "http://mobile.domain.com/test";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.sessionStorage.getItem("noredirection") === "true", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromDesktop()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/page";
	window.TEST.config.noredirection_param = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockFFDesktopNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/page", "Error in no redirection happening");
})

test ('NoRedirectionFromMobileBecauseOfSessionStorage()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.config.noredirection_param = "noredirection";
	window.TEST.mockDocument.referrer = "http://www.domain.com/test";
	window.TEST.sessionStorage.setItem("noredirection","true");
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	
	expect(1);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromMobileBecauseOfCookie()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/home";
	window.TEST.config.noredirection_param = "noredirection";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = window.TEST.config.noredirection_param;
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/home", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromMobileBecauseOfParameter()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/home";
	window.TEST.mockDocument.location.search = "?noredirection=true";
	window.TEST.config.noredirection_param = "noredirection";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/home", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionIpad()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/home";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_scheme = "https";
	window.TEST.config.tablet_redirection = "";
	window.TEST.config.noredirection_param = "ss";
	window.TEST.config.tablet_url = "";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href !== "https://www.whatever.com/example", "Redirection happening");
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/home", "Redirection happening");
})

test ('NoRedirectionIpad2()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/home";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_scheme = "https";
	window.TEST.config.tablet_redirection = "false";
	window.TEST.config.noredirection_param = "ee";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href !== "https://www.whatever.com/example", "Redirection happening");
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/home", "Redirection happening");
})

test ('NoRedirectionBecauseOfCallback()', function() {
	window.TEST.mockDocument.location.host = "http://www.domain.com/home";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.noredirection_param = "aa";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = "";
	window.TEST.config.beforeredirection_callback = (function(){return false;});
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator,  window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/home", "Redirection for iPhone happening");
})

test ('NoRedirectionBecauseOfCallback2()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/page";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_scheme = "https";
	window.TEST.config.noredirection_param = "bb";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = "";
	window.TEST.config.beforeredirection_callback = (function(){var a = "hi";});
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/page", "Redirection happening");
})
