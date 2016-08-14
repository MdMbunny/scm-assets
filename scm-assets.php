<?php
/**
 * Plugin Name:         SCM Assets
 * Plugin URI:          http://studiocreativo-m.it/
 * Description:         SCM Javascript Integration
 * Version:             1.3.9
 * Author:              Studio Creativo M
 * Author URI:          http://studiocreativo-m.it/
 * License:             http://www.gnu.org/licenses/gpl-3.0.html
 * GitHub Plugin URI:   MdMbunny/scm-assets
 * GitHub Branch:       master
 */

// *****************************************************
// *      0.0 INIT - [AUTOMATIC - DO NOT TOUCH]
// *****************************************************

    add_action( 'plugins_loaded', 'scm_plugin_init' );

    // Init Plugin
    if ( ! function_exists( 'scm_plugin_init' ) ) {
        function scm_plugin_init($file){
            
            $file = ( $file ?: __FILE__ );
            $plugin = scm_plugin_name( $file );
            $slug = sanitize_title( $plugin );
            $name = strtoupper( str_replace( '-', '_', $slug ) );
            $dir = dirname( $file ) . '/';
            $uri = plugin_dir_url( $file );

            // PLUGIN CONSTANTS
            define( $name,                             $slug );
            define( $name . '_VERSION',                scm_plugin_version( $file ) );
            define( $name . '_DIR',                    $dir );
            define( $name . '_URI',                    $uri );
            define( $name . '_DIR_ASSETS',             $dir . 'assets/' );
            define( $name . '_URI_ASSETS',             $uri . 'assets/' );
            define( $name . '_DIR_LANG',               $dir . 'lang/' );
            define( $name . '_URI_LANG',               $uri . 'lang/' );

            // PLUGIN TEXTDOMAIN
            load_plugin_textdomain( $slug, false, $dir . 'lang/' );
        }
    }else{
        scm_plugin_init( __FILE__ );
    }

    // Get Plugin Data
    if ( ! function_exists( 'scm_plugin_data' ) ) {
        // All Data
        function scm_plugin_data( $file ) {
            if ( ! function_exists( 'get_plugins' ) )
                require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
            $plugin_folder = get_plugins( '/' . plugin_basename( dirname( $file ) ) );
            $plugin_file = basename( ( $file ) );
            return $plugin_folder[ $plugin_file ];
        }
        // Name
        function scm_plugin_name( $file ) {
            $plug = scm_plugin_data( $file );
            return $plug[ 'Name' ];
            //return scm_plugin_data( $file )[ 'Name' ];
        }
        // Version
        function scm_plugin_version( $file ) {
            $plug = scm_plugin_data( $file );
            return $plug[ 'Version' ];
            //return scm_plugin_data( $file )[ 'Version' ];
        }
    }


// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************
// *** CUSTOM CODE GOES HERE *************************************************************************************************************************************
// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************

define( 'SCM_ASSETS_FANCYBOX', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/' );

/*
*****************************************************
*
*   0.0 Actions and Filters
*   1.0 Assets
*
*****************************************************
*/

// *****************************************************
// *      0.0 ACTIONS AND FILTERS
// *****************************************************

    add_action( 'admin_enqueue_scripts', 'scm_assets_admin_register' );
    add_action( 'login_enqueue_scripts', 'scm_assets_login_register' );
    add_action( 'wp_enqueue_scripts', 'scm_assets_register_styles' );
    add_action( 'wp_enqueue_scripts', 'scm_assets_register_scripts' );

    add_action( 'wp_footer', 'scm_assets_inline_scripts_footer' );

    add_action( 'wp_enqueue_scripts', 'scm_assets_register_fontawesome' );
    add_action( 'admin_enqueue_scripts', 'scm_assets_register_fontawesome', 997 );

// *****************************************************
// *      1.0 ASSETS
// *****************************************************

    //styles
    if ( ! function_exists( 'scm_assets_register_styles' ) ) {
        function scm_assets_register_styles() {

            // Fancybox
            
            if( get_field( 'opt-tools-fancybox', 'option' ) ){
                /*wp_register_style( 'fancybox-style', SCM_ASSETS_FANCYBOX . 'jquery.fancybox.min.css', false, null );
                wp_register_style( 'fancybox-thumbs-style', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-thumbs.css', false, null );
                wp_register_style( 'fancybox-buttons-style', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-buttons.css', false, null );*/
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
            
            // jQuery Effects Core

            wp_enqueue_script('jquery-effects-core');

            if( get_field( 'opt-tools-greensock', 'option' ) ){
                wp_register_script( 'greensock',  SCM_ASSETS_URI_ASSETS . 'greensock-js-1.18.3/src/minified/TweenMax.min.js', array( 'jquery' ), null, true );
                wp_enqueue_script( 'greensock' );
                wp_register_script( 'gsap',  SCM_ASSETS_URI_ASSETS . 'greensock-js-1.18.3/src/minified/jquery.gsap.min.js', array( 'greensock' ), null, true );
                wp_enqueue_script( 'gsap' );
                /*wp_register_script( 'greensock-scrollto',  SCM_ASSETS_URI_ASSETS . 'greensock-js-1.18.3/src/minified/plugins/ScrollToPlugin.min.js', array( 'greensock' ), null, true );
                wp_enqueue_script( 'greensock-scrollto' );*/
            }

            wp_register_script( 'scroll-magic',  SCM_ASSETS_URI_ASSETS . 'scrollmagic-2.0.5/minified/ScrollMagic.min.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'scroll-magic' );
            wp_register_script( 'scroll-magic-jquery',  SCM_ASSETS_URI_ASSETS . 'scrollmagic-2.0.5/minified/plugins/jquery.ScrollMagic.min.js', array( 'scroll-magic' ), null, true );
            wp_enqueue_script( 'scroll-magic-jquery' );
            wp_register_script( 'scroll-magic-debug',  SCM_ASSETS_URI_ASSETS . 'scrollmagic-2.0.5/minified/plugins/debug.addIndicators.min.js', array( 'scroll-magic-jquery' ), null, true );
            wp_enqueue_script( 'scroll-magic-debug' );
            
            // Modernizr Touch --- mh...

            /*wp_register_script( 'modernizr-touch', SCM_ASSETS_URI_ASSETS . 'modernizr-3.3.1/modernizr.touch.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'modernizr-touch' );*/

            // TouchSwipe

            wp_register_script( 'jquery-touch-swipe', SCM_ASSETS_URI_ASSETS . 'touchSwipe-1.6.8/jquery.touchSwipe.min.js', array( 'scroll-magic-jquery' ), null, true );
            wp_enqueue_script( 'jquery-touch-swipe' );
            
            // Images Loaded
            
            wp_register_script( 'imagesloaded', SCM_ASSETS_URI_ASSETS . 'imagesloaded-4.1.0/imagesloaded.pkgd.min.js', array( 'jquery-touch-swipe' ), null, true );
            wp_enqueue_script( 'imagesloaded' );

            // Awesome Cursor

            if( get_field( 'opt-tools-cursor', 'option' ) ){
                wp_register_script( 'awesome-cursor',  SCM_ASSETS_URI_ASSETS . 'awesome-cursor-0.3.0/dist/jquery.awesome-cursor.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'awesome-cursor' );
            }

            // Fancybox --- You could replace it

            if( get_field( 'opt-tools-fancybox', 'option' ) ){
                
                // CDN
                /*wp_register_script( 'fancybox', SCM_ASSETS_FANCYBOX . 'jquery.fancybox.pack.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-thumbs', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-thumbs.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-buttons', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-buttons.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-media', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-media.js', array( 'jquery' ), null, true );*/
                // MAIN
                wp_register_script( 'fancybox', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/jquery.fancybox.pack.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'fancybox' );
                // MIN
                wp_register_script( 'fancybox-helpers', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-helpers.min.js', array( 'fancybox' ), null, true );
                wp_enqueue_script( 'fancybox-helpers' );
                // FULL
                /*wp_register_script( 'fancybox-thumbs', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-thumbs.js', array( 'fancybox' ), null, true );
                wp_enqueue_script( 'fancybox-thumbs' );
                wp_register_script( 'fancybox-buttons', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-buttons.js', array( 'fancybox-thumbs' ), null, true );
                wp_enqueue_script( 'fancybox-buttons' );
                wp_register_script( 'fancybox-media', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-media.js', array( 'fancybox-buttons' ), null, true );
                wp_enqueue_script( 'fancybox-media' );*/
            }

            // Nivo Slider --- You could replace it (probably with _ScrollMagic_)

            if( get_field( 'main-slider-active', 'option' ) == 'nivo' || get_field( 'opt-tools-nivo', 'option' ) ){
                wp_register_script( 'nivo', SCM_ASSETS_URI_ASSETS . 'nivoSlider-3.2/jquery.nivo.slider.pack.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'nivo' );
            }

            // BX Slider --- You could replace it (probably with _ScrollMagic_)

            if( get_field( 'main-slider-active', 'option' ) == 'bx' || get_field( 'opt-tools-bx', 'option' ) ){
                wp_register_script( 'bx', SCM_ASSETS_URI_ASSETS . 'jquery.bxslider-4.1.2/jquery.bxslider.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'bx' );
            }

            // Tooltip --- You could replace it (probably with _ScrollMagic_)

            if( get_field( 'opt-tools-tooltip', 'option' ) ){
                wp_register_script( 'tooltip',  SCM_ASSETS_URI_ASSETS . 'jquery.powertip-1.2.0/jquery.powertip.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'tooltip' );
            }

            // Parallax Scrolling --- Will be substituted by _ScrollMagic_

            if( get_field( 'opt-tools-parallax', 'option' ) ){
                $old = apply_filters( 'scm_assets_filter_parallax_131', false );
                if(!$old)
                    wp_register_script( 'parallax',  SCM_ASSETS_URI_ASSETS . 'parallax-1.4.2/parallax.min.js', array( 'imagesloaded' ), null, true );
                else
                    wp_register_script( 'parallax',  SCM_ASSETS_URI_ASSETS . 'parallax-1.3.1/parallax.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'parallax' );
            }

            // SCM Stuff

            // MIN
            /*wp_register_script( 'jquery-scm-tools', SCM_ASSETS_URI . 'scm.min.js', array( 'imagesloaded' ), null, true );
            wp_enqueue_script( 'jquery-scm-tools' );*/
            // FULL
            wp_register_script( 'jquery-scm-functions', SCM_ASSETS_URI . 'scm-functions.js', array( 'imagesloaded' ), null, true );
            wp_enqueue_script( 'jquery-scm-functions' );
            wp_register_script( 'jquery-scm-tools', SCM_ASSETS_URI . 'scm-tools.js', array( 'jquery-scm-functions' ), null, true );
            wp_enqueue_script( 'jquery-scm-tools' );

            wp_register_script( 'jquery-scm-acf', SCM_ASSETS_URI . 'scm-acf.js', array( 'jquery-scm-tools' ), null, true );
            wp_enqueue_script( 'jquery-scm-acf' );

            // SCM Child

            wp_register_script( 'jquery-scm-child', get_stylesheet_directory_uri() . '/_assets/js/jquery.scm-child.js', array( 'jquery-scm-acf' ), null, true );
            wp_enqueue_script( 'jquery-scm-child' );
            
            // SCM

            wp_register_script( 'jquery-scm', SCM_ASSETS_URI . 'scm.js', array( 'jquery-scm-child' ), null, true );
            wp_enqueue_script( 'jquery-scm' );

            global $wp_query;
            wp_localize_script( 'jquery-scm-tools', 'ajaxcall', array(
                'url' => admin_url( 'admin-ajax.php' ),
                'query_vars' => json_encode( $wp_query->query ),
            ));
        }
    }

    // inline footer
    if ( ! function_exists( 'scm_assets_inline_scripts_footer' ) ) {
        function scm_assets_inline_scripts_footer() {
            global $SCM_archives;
            echo '<script>var ARCHIVES = ' . json_encode( $SCM_archives ) . ';</script>';
        }
    }

    // admin
    if ( ! function_exists( 'scm_assets_admin_register' ) ) {
        function scm_assets_admin_register() {

            wp_register_script( 'jquery-scm-admin-child', get_stylesheet_directory_uri() . '/_assets/js/jquery.admin.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-scm-admin-child' );

            wp_register_script( 'jquery-scm-admin', SCM_ASSETS_URI . 'scm-admin.js', array( 'jquery-scm-admin-child' ), null, true );
            wp_enqueue_script( 'jquery-scm-admin' );

            global $wp_query;
            wp_localize_script( 'jquery-scm-admin', 'USER', array(
                'level' => SCM_LEVEL,
            ));

        }
    }

    // login
    if ( ! function_exists( 'scm_assets_login_register' ) ) {
        function scm_assets_login_register() {
                
            wp_register_script( 'jquery-scm-login-child', get_stylesheet_directory_uri() . '/_assets/js/jquery.login.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-scm-login-child' );
            
            wp_register_script( 'jquery-scm-login', SCM_ASSETS_URI . 'scm-login.js', array( 'jquery-scm-login-child' ), null, true );
            wp_enqueue_script( 'jquery-scm-login' );                

        }
    }

    // fontawesome
    if ( ! function_exists( 'scm_assets_register_fontawesome' ) ) {
        function scm_assets_register_fontawesome() {

            //wp_register_script('font-awesome', 'https://use.fontawesome.com/ee6c1736d8.js', null, null, true );
            //wp_enqueue_script( 'font-awesome' );
            wp_register_style('font-awesome', SCM_ASSETS_URI_ASSETS . 'font-awesome-4.6.3/css/font-awesome.min.css', false, null );
            wp_enqueue_style( 'font-awesome' );   

        }
    }