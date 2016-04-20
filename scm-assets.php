<?php
/**
 * Plugin Name:         SCM Assets
 * Plugin URI:          http://studiocreativo-m.it/
 * Description:         SCM Javascript Integration
 * Version:             1.0.5
 * Author:              Studio Creativo M
 * Author URI:          http://studiocreativo-m.it/
 * License:             http://www.gnu.org/licenses/gpl-3.0.html
 * GitHub Plugin URI:   MdMbunny/scm-assets
 * GitHub Branch:       master
 */

/*
*****************************************************
*
*   0.0 Actions and Filters
*   1.0 Init
*   2.0 Assets
*
*****************************************************
*/

// *****************************************************
// *      0.0 ACTIONS AND FILTERS
// *****************************************************

    add_action( 'plugins_loaded', 'scm_assets_init' );

    add_action( 'admin_enqueue_scripts', 'scm_assets_admin_register' );
    add_action( 'login_enqueue_scripts', 'scm_assets_login_register' );
    add_action( 'wp_enqueue_scripts', 'scm_assets_register_styles' );
    add_action( 'wp_enqueue_scripts', 'scm_assets_register_scripts' );    

// *****************************************************
// *      1.0 INIT
// *****************************************************

    if ( ! function_exists( 'scm_assets_version' ) ) {
        function scm_assets_version() {
            if ( ! function_exists( 'get_plugins' ) )
                require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
            $plugin_folder = get_plugins( '/' . plugin_basename( dirname( __FILE__ ) ) );
            $plugin_file = basename( ( __FILE__ ) );
            return $plugin_folder[$plugin_file]['Version'];
        }
    }


    if ( ! function_exists( 'scm_assets_init' ) ) {
        function scm_assets_init() {
            
            define( 'SCM_ASSETS_VERSION',                scm_assets_version() );
            define( 'SCM_ASSETS_DIR',                    dirname(__FILE__) . '/' );
            define( 'SCM_ASSETS_URI',                    plugin_dir_url(__FILE__) );
            define( 'SCM_ASSETS_DIR_ASSETS',             SCM_ASSETS_DIR . 'assets/' );
            define( 'SCM_ASSETS_URI_ASSETS',             SCM_ASSETS_URI . 'assets/' );
            
        }
    }

// *****************************************************
// *      2.0 ASSETS
// *****************************************************

    //styles
    if ( ! function_exists( 'scm_assets_register_styles' ) ) {
        function scm_assets_register_styles() {

            // Fancybox
            
            if( get_field( 'opt-tools-fancybox', 'option' ) ){
                wp_register_style( 'fancybox-style', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/jquery.fancybox.css', false, null );
                wp_register_style( 'fancybox-thumbs-style', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-thumbs.css', false, null );
                wp_register_style( 'fancybox-buttons-style', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-buttons.css', false, null );
                wp_enqueue_style( 'fancybox-style' );
                wp_enqueue_style( 'fancybox-thumbs-style' );
                wp_enqueue_style( 'fancybox-buttons-style' );
            }

            // Nivo Slider

            if( get_field( 'main-slider-active', 'option' ) == 'nivo' || get_field( 'opt-tools-nivo', 'option' ) ){
                wp_register_style( 'nivo-style', SCM_ASSETS_URI_ASSETS . 'nivoSlider-3.2/nivo-slider.css', false, null );
                wp_register_style( 'nivo-theme-style', SCM_ASSETS_URI_ASSETS . 'nivoSlider-3.2/themes/scm/scm.css', false, null );
                wp_enqueue_style( 'nivo-style' );
                wp_enqueue_style( 'nivo-theme-style' );
            }

            // BX Slider

            if( get_field( 'main-slider-active', 'option' ) == 'bx' || get_field( 'opt-tools-bx', 'option' ) ){
                wp_register_style( 'bx-style', SCM_ASSETS_URI_ASSETS . 'jquery.bxslider-4.1.2/jquery.bxslider.css', false, null );
                wp_enqueue_style( 'bx-style' );
            }
        }
    }

    // scripts
    if ( ! function_exists( 'scm_assets_register_scripts' ) ) {
        function scm_assets_register_scripts() {

            // SCM Stuff
            
            wp_register_script( 'jquery-scm-presets', SCM_ASSETS_URI_ASSETS . 'jquery.scm/jquery.presets.js', array( 'jquery' ), null, false );
            wp_enqueue_script( 'jquery-scm-presets' );

            wp_register_script( 'jquery-scm-functions', SCM_ASSETS_URI_ASSETS . 'jquery.scm/jquery.functions.js', array( 'jquery-scm-presets' ), null, false );
            wp_enqueue_script( 'jquery-scm-functions' );
            
            wp_register_script( 'jquery-scm-plugins', SCM_ASSETS_URI_ASSETS . 'jquery.scm/jquery.plugins.js', array( 'jquery-scm-functions' ), null, false );
            wp_enqueue_script( 'jquery-scm-plugins' );

            wp_register_script( 'jquery-scm-tools', SCM_ASSETS_URI_ASSETS . 'jquery.scm/jquery.tools.js', array( 'jquery-scm-plugins' ), null, false );
            wp_enqueue_script( 'jquery-scm-tools' );
            
            // jQuery Effects Core

            wp_enqueue_script('jquery-effects-core');
            
            // jQuery CSS3 Transform

            wp_register_script( 'jquery-transform-2d', SCM_ASSETS_URI_ASSETS . 'jquery.transform/jquery.transform2d.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-transform-2d' );

            // jQuery Mobile --- mh...
            
            wp_register_script( 'jquery-mobile-touch', SCM_ASSETS_URI_ASSETS . 'jquery.mobile-1.4.5/jquery.mobile.touch.min.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-mobile-touch' );

            // Modernizr Touch --- mh...

            wp_register_script( 'modernizr-touch', SCM_ASSETS_URI_ASSETS . 'modernizr-2.8.3/modernizr.touch.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'modernizr-touch' );

            // TouchSwipe

            wp_register_script( 'jquery-touch-swipe', SCM_ASSETS_URI_ASSETS . 'touchSwipe-1.6.8/jquery.touchSwipe.min.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-touch-swipe' );
            
            // Images Loaded
            
            wp_register_script( 'imagesloaded', SCM_ASSETS_URI_ASSETS . 'imagesloaded-4.1.0/imagesloaded.pkgd.min.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'imagesloaded' );

            // Awesome Cursor

            if( get_field( 'opt-tools-cursor', 'option' ) ){
                wp_register_script( 'awesome-cursor',  SCM_ASSETS_URI_ASSETS . 'jquery.awesome-cursor-0.2.0/jquery.awesome-cursor.min.js', array( 'jquery' ), null, true );
                wp_enqueue_script( 'awesome-cursor' );
            }

            // Fancybox --- You could replace it

            if( get_field( 'opt-tools-fancybox', 'option' ) ){
                wp_register_script( 'fancybox', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/jquery.fancybox.pack.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-thumbs', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-thumbs.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-buttons', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-buttons.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-media', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-media.js', array( 'jquery' ), null, true );
                wp_enqueue_script( 'fancybox' );
                wp_enqueue_script( 'fancybox-thumbs' );
                wp_enqueue_script( 'fancybox-buttons' );
                wp_enqueue_script( 'fancybox-media' );
            }

            // Nivo Slider --- You could replace it (probably with _ScrollMagic_)

            if( get_field( 'main-slider-active', 'option' ) == 'nivo' || get_field( 'opt-tools-nivo', 'option' ) ){
                wp_register_script( 'nivo', SCM_ASSETS_URI_ASSETS . 'nivoSlider-3.2/jquery.nivo.slider.pack.js', array( 'jquery' ), null, true );
                wp_enqueue_script( 'nivo' );
            }

            // BX Slider --- You could replace it (probably with _ScrollMagic_)

            if( get_field( 'main-slider-active', 'option' ) == 'bx' || get_field( 'opt-tools-bx', 'option' ) ){
                wp_register_script( 'bx', SCM_ASSETS_URI_ASSETS . 'jquery.bxslider-4.1.2/jquery.bxslider.min.js', array( 'jquery' ), null, true );
                wp_enqueue_script( 'bx' );
            }

            // Tooltip --- You could replace it (probably with _ScrollMagic_)

            if( get_field( 'opt-tools-tooltip', 'option' ) ){
                wp_register_script( 'tooltip',  SCM_ASSETS_URI_ASSETS . 'jquery.powertip-1.2.0/jquery.powertip.min.js', array( 'jquery' ), null, true );
                wp_enqueue_script( 'tooltip' );
            }

            // Bootstrap --- Will be substituted by _ScrollMagic_

            wp_register_script( 'bootstrap', SCM_ASSETS_URI_ASSETS . 'bootstrap-3.3.6-dist/js/bootstrap.min.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'bootstrap' );

            // Parallax Scrolling --- Will be substituted by _ScrollMagic_

            if( get_field( 'opt-tools-parallax', 'option' ) ){
                $old = apply_filters( 'scm_assets_filter_parallax_131', false );
                if(!$old)
                    wp_register_script( 'parallax',  SCM_ASSETS_URI_ASSETS . 'parallax-1.4.2/parallax.min.js', array( 'jquery' ), null, true );
                else
                    wp_register_script( 'parallax',  SCM_ASSETS_URI_ASSETS . 'parallax-1.3.1/parallax.min.js', array( 'jquery' ), null, true );
                wp_enqueue_script( 'parallax' );
            }

            // Waypoints --- Will be substituted by _ScrollMagic_

            wp_register_script( 'waypoints',  SCM_ASSETS_URI_ASSETS . 'waypoints-4.0.0/lib/jquery.waypoints.min.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'waypoints' );
            //wp_register_script( 'waypoints-debug',  SCM_ASSETS_URI_ASSETS . 'waypoints-4.0.0/lib/waypoints.debug.js', false, SCM_ASSETS_VERSION, true );
            //wp_enqueue_script( 'waypoints-debug' );
            // import waypoints shortcuts if needed (sticky, infinite, ...)

            // SCM Child

            wp_register_script( 'jquery-scm-child', SCM_URI_JS_CHILD . 'jquery.scm-child.js', array( 'jquery-scm-tools' ), null, true );
            wp_enqueue_script( 'jquery-scm-child' );
            
            // SCM

            wp_register_script( 'jquery-scm', SCM_ASSETS_URI_ASSETS . 'jquery.scm/jquery.scm.js', array( 'jquery-scm-child' ), null, true );
            wp_enqueue_script( 'jquery-scm' );

        }
    }

    // admin
    if ( ! function_exists( 'scm_assets_admin_register' ) ) {
        function scm_assets_admin_register() {

            wp_register_script( 'jquery-scm-admin-child', SCM_URI_JS_CHILD . 'jquery.admin.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-scm-admin-child' );

            wp_register_script( 'jquery-scm-admin', SCM_ASSETS_URI_ASSETS . 'jquery.scm/jquery.admin.js', array( 'jquery-scm-admin-child' ), null, true );
            wp_enqueue_script( 'jquery-scm-admin' );

        }
    }

    // login
    if ( ! function_exists( 'scm_assets_login_register' ) ) {
        function scm_assets_login_register() {
                
            wp_register_script( 'jquery-scm-login-child', SCM_URI_JS_CHILD . 'jquery.login.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-scm-login-child' );
            
            wp_register_script( 'jquery-scm-login', SCM_ASSETS_URI_ASSETS . 'jquery.scm/jquery.login.js', array( 'jquery-scm-login-child' ), null, true );
            wp_enqueue_script( 'jquery-scm-login' );                

        }
    }