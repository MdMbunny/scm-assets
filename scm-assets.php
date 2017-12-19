<?php
/**
 * Plugin Name:         SCM Assets
 * Plugin URI:          http://studiocreativo-m.it/
 * Description:         SCM Javascript Integration
 * Version:             2.0.5
 * Author:              Studio Creativo M
 * Author URI:          http://studiocreativo-m.it/
 * License:             http://www.gnu.org/licenses/gpl-3.0.html
 * GitHub Plugin URI:   MdMbunny/scm-assets
 * GitHub Branch:       master
 */

// *****************************************************
// *      0.0 INIT - [AUTOMATIC - DO NOT TOUCH]
// *****************************************************

    if ( ! function_exists( 'scm_plugin_data' ) ) {
        function scm_plugin_data( $file ) {
            if ( ! function_exists( 'get_plugins' ) )
                require_once( ABSPATH . 'wp-admin/includes/plugin.php' );

            $plugin_folder = get_plugins( '/' . plugin_basename( dirname( $file ) ) );
            $plugin_file = basename( ( $file ) );
            $plugin = $plugin_folder[ $plugin_file ];

            $name = $plugin[ 'Name' ];
            $version = $plugin[ 'Version' ];
            $slug = sanitize_title( $name );
            $const = strtoupper( str_replace( '-', '_', $slug ) );
            $dir = dirname( $file ) . '/';
            $uri = plugin_dir_url( $file );

            // PLUGIN CONSTANTS
            
            define( $const,                             $slug );
            define( $const . '_VERSION',                $version );
            define( $const . '_DIR',                    $dir );
            define( $const . '_URI',                    $uri );
            define( $const . '_DIR_ASSETS',             $dir . 'assets/' );
            define( $const . '_URI_ASSETS',             $uri . 'assets/' );
            define( $const . '_DIR_LANG',               $dir . 'lang/' );
            define( $const . '_URI_LANG',               $uri . 'lang/' );

            load_plugin_textdomain( $slug, false, $dir . 'lang/' );   
        }
    }

    scm_plugin_data( __FILE__ );   


// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************
// *** CUSTOM CODE GOES HERE *************************************************************************************************************************************
// ***************************************************************************************************************************************************************
// ***************************************************************************************************************************************************************

//define( 'SCM_ASSETS_FANCYBOX', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/' );

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

    $scm_assets_settings = array();

    add_action( 'get_header', function(){
        global $scm_assets_settings;

        $scm_assets_settings = array(
        
            'fancybox' => get_field( 'field_dd47ef3222f3a76468506c5023704c3418baa366', 'option' ),
            'slider' => get_field( 'field_f019e82262f977e3f80a2d08fa4d33f6b999a377', 'option' ),
            'nivo' => get_field( 'field_06a1438d68baa32149e13e50ef5c595fa682cced', 'option' ),
            'bx' => get_field( 'field_f68120206e9e0bddaece46df0b46a6aa714f324a', 'option' ),
            'tables' => get_field( 'field_20751f1b7fc97968f633389054628ecfe2c670bb', 'option' ),
            'greensock' => get_field( 'field_47fa249fdc6f56b2c04f3da806e3da3b5f4b0d4f', 'option' ),
            'tooltip' => get_field( 'field_756f434ffb55c80b7a9056e5cdb2747d7f142d72', 'option' ),
            'parallax' => get_field( 'field_660a4e40e47211831899c4f18431f7540050da3c', 'option' ),
            'cursor' => get_field( 'field_7912847d7f69b0b20a15aa4d22095dc54d994cac', 'option' ),

        );

    } );

    

    add_action( 'admin_enqueue_scripts', 'scm_assets_admin_register' );
    //add_action( 'login_enqueue_scripts', 'scm_assets_login_register' );
    
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

            global $scm_assets_settings;

            // Fancybox
            
            $fancy = apply_filters( 'scm_assets_filter_block_fancybox', false );
            if( !$fancy && $scm_assets_settings['fancybox'] ){ // opt-tools-fancybox
                /*wp_register_style( 'fancybox-style', SCM_ASSETS_FANCYBOX . 'jquery.fancybox.min.css', false, null );
                wp_register_style( 'fancybox-thumbs-style', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-thumbs.css', false, null );
                wp_register_style( 'fancybox-buttons-style', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-buttons.css', false, null );*/
                wp_register_style( 'fancybox-style', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/jquery.fancybox.css', false, null );
                //wp_register_style( 'fancybox-thumbs-style', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-thumbs.css', false, null );
                //wp_register_style( 'fancybox-buttons-style', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-buttons.css', false, null );
                wp_enqueue_style( 'fancybox-style' );
                //wp_enqueue_style( 'fancybox-thumbs-style' );
                //wp_enqueue_style( 'fancybox-buttons-style' );
            }

            // Nivo Slider

            $nivo = apply_filters( 'scm_assets_filter_block_nivo', false );
            if( !$nivo && ( $scm_assets_settings['slider'] == 'nivo' || $scm_assets_settings['nivo'] ) ){ // main-slider-active + opt-tools-nivo
                wp_register_style( 'nivo-style', SCM_ASSETS_URI_ASSETS . 'nivoSlider-3.2/nivo-slider.css', false, null );
                //wp_register_style( 'nivo-theme-style', SCM_ASSETS_URI_ASSETS . 'nivoSlider-3.2/themes/scm/scm.css', false, null );
                wp_enqueue_style( 'nivo-style' );
                //wp_enqueue_style( 'nivo-theme-style' );
            }

            // BX Slider

            $bx = apply_filters( 'scm_assets_filter_block_bx', false );
            if( !$bx && ( $scm_assets_settings['slider'] == 'bx' || $scm_assets_settings['bx'] ) ){
                wp_register_style( 'bx-style', SCM_ASSETS_URI_ASSETS . 'jquery.bxslider-4.2.11/jquery.bxslider.css', false, null );
                wp_enqueue_style( 'bx-style' );
            }
        }
    }

    // scripts
    if ( ! function_exists( 'scm_assets_register_scripts' ) ) {
        function scm_assets_register_scripts() {

            global $scm_assets_settings;

            global $post;
            
            // jQuery Effects Core

            wp_enqueue_script('jquery-effects-core');
            
            if( $scm_assets_settings['tables'] )
                wp_enqueue_script('jquery-ui-autocomplete');
            
            wp_enqueue_script('imagesloaded');

            // Greensock
            $greensock = apply_filters( 'scm_assets_filter_block_greensock', false );
            if( !$greensock && $scm_assets_settings['greensock'] ){
                wp_register_script( 'greensock',  SCM_ASSETS_URI_ASSETS . 'greensock-js-1.18.3/src/minified/TweenMax.min.js', array( 'jquery', 'imagesloaded' ), null, true );
                wp_enqueue_script( 'greensock' );
                wp_register_script( 'gsap',  SCM_ASSETS_URI_ASSETS . 'greensock-js-1.18.3/src/minified/jquery.gsap.min.js', array( 'greensock' ), null, true );
                wp_enqueue_script( 'gsap' );
                /*wp_register_script( 'greensock-scrollto',  SCM_ASSETS_URI_ASSETS . 'greensock-js-1.18.3/src/minified/plugins/ScrollToPlugin.min.js', array( 'greensock' ), null, true );
                wp_enqueue_script( 'greensock-scrollto' );*/
            }

            // ScrollMagic
            $magic = apply_filters( 'scm_assets_filter_block_magic', false );
            if( !$magic ){
                wp_register_script( 'scroll-magic',  SCM_ASSETS_URI_ASSETS . 'scrollmagic-2.0.5/minified/ScrollMagic.min.js', array( 'jquery', 'imagesloaded' ), null, true );
                wp_enqueue_script( 'scroll-magic' );
                wp_register_script( 'scroll-magic-jquery',  SCM_ASSETS_URI_ASSETS . 'scrollmagic-2.0.5/minified/plugins/jquery.ScrollMagic.min.js', array( 'scroll-magic' ), null, true );
                wp_enqueue_script( 'scroll-magic-jquery' );
                
                wp_register_script( 'scroll-magic-debug',  SCM_ASSETS_URI_ASSETS . 'scrollmagic-2.0.5/minified/plugins/debug.addIndicators.min.js', array( 'scroll-magic-jquery' ), null, true );
                wp_enqueue_script( 'scroll-magic-debug' );
            }

            // Fancybox --- You could replace it
            $fancy = apply_filters( 'scm_assets_filter_block_fancybox', false );
            if( !$fancy && $scm_assets_settings['fancybox'] ){
                
                // CDN
                /*wp_register_script( 'fancybox', SCM_ASSETS_FANCYBOX . 'jquery.fancybox.pack.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-thumbs', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-thumbs.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-buttons', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-buttons.js', array( 'jquery' ), null, true );
                wp_register_script( 'fancybox-media', SCM_ASSETS_FANCYBOX . 'helpers/jquery.fancybox-media.js', array( 'jquery' ), null, true );*/
                // MAIN
                wp_register_script( 'fancybox', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/jquery.fancybox.pack.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'fancybox' );
                // MIN
                //wp_register_script( 'fancybox-helpers', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-helpers.min.js', array( 'fancybox' ), null, true );
                //wp_enqueue_script( 'fancybox-helpers' );
                // FULL
                /*wp_register_script( 'fancybox-thumbs', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-thumbs.js', array( 'fancybox' ), null, true );
                wp_enqueue_script( 'fancybox-thumbs' );
                wp_register_script( 'fancybox-buttons', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-buttons.js', array( 'fancybox-thumbs' ), null, true );
                wp_enqueue_script( 'fancybox-buttons' );
                wp_register_script( 'fancybox-media', SCM_ASSETS_URI_ASSETS . 'fancybox-2.1.5/helpers/jquery.fancybox-media.js', array( 'fancybox-buttons' ), null, true );
                wp_enqueue_script( 'fancybox-media' );*/
            }

            // Nivo Slider --- You could replace it (probably with _ScrollMagic_)
            $nivo = apply_filters( 'scm_assets_filter_block_nivo', false );
            if( !$nivo && ( $scm_assets_settings['slider'] == 'nivo' || $scm_assets_settings['nivo'] ) ){
                wp_register_script( 'nivo', SCM_ASSETS_URI_ASSETS . 'nivoSlider-3.2/jquery.nivo.slider.pack.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'nivo' );
            }

            // BX Slider --- You could replace it (probably with _ScrollMagic_)
            $bx = apply_filters( 'scm_assets_filter_block_bx', false );
            if( !$bx && ( $scm_assets_settings['slider'] == 'bx' || $scm_assets_settings['bx'] ) ){
                wp_register_script( 'bx', SCM_ASSETS_URI_ASSETS . 'jquery.bxslider-4.2.11/jquery.bxslider.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'bx' );
            }

            // Tooltip --- You could replace it (probably with _ScrollMagic_)
            $tooltip = apply_filters( 'scm_assets_filter_block_tooltip', false );
            if( !$tooltip && $scm_assets_settings['tooltip'] ){
                wp_register_script( 'tooltip',  SCM_ASSETS_URI_ASSETS . 'jquery.powertip-1.3.0/jquery.powertip.min.js', array( 'imagesloaded' ), null, true );
                //wp_register_script( 'tooltip',  SCM_ASSETS_URI_ASSETS . 'jquery.powertip-1.2.0/jquery.powertip.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'tooltip' );
            }

            // Parallax Scrolling --- Will be substituted by _ScrollMagic_
            $parallax = apply_filters( 'scm_assets_filter_block_parallax', false );
            if( !$parallax && $scm_assets_settings['parallax'] ){
                $old = apply_filters( 'scm_assets_filter_parallax_131', false );
                if(!$old)
                    wp_register_script( 'parallax',  SCM_ASSETS_URI_ASSETS . 'parallax-1.4.2/parallax.min.js', array( 'imagesloaded' ), null, true );
                else
                    wp_register_script( 'parallax',  SCM_ASSETS_URI_ASSETS . 'parallax-1.3.1/parallax.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'parallax' );
            }

            // TouchSwipe
            $touch = apply_filters( 'scm_assets_filter_block_touch', false );
            if( !$touch ){
                wp_register_script( 'jquery-touch-swipe', SCM_ASSETS_URI_ASSETS . 'touchSwipe-1.6.8/jquery.touchSwipe.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'jquery-touch-swipe' );
            }

            // Awesome Cursor
            $cursor = apply_filters( 'scm_assets_filter_block_cursor', false );
            if( !$cursor && $scm_assets_settings['cursor'] ){
                wp_register_script( 'awesome-cursor',  SCM_ASSETS_URI_ASSETS . 'awesome-cursor-0.3.0/dist/jquery.awesome-cursor.min.js', array( 'imagesloaded' ), null, true );
                wp_enqueue_script( 'awesome-cursor' );
            }



            wp_register_script( 'color-thief',  SCM_ASSETS_URI_ASSETS . 'color-thief-2.0.1/src/color-thief.js', array( 'imagesloaded' ), null, true );
            wp_enqueue_script( 'color-thief' );
            wp_register_script( 'vibrant',  SCM_ASSETS_URI_ASSETS . 'vibrant.js-1.0/dist/Vibrant.min.js', array( 'imagesloaded' ), null, true );
            wp_enqueue_script( 'vibrant' );


        // SCM Stuff

            // MIN
            //wp_register_script( 'jquery-scm-tools', SCM_ASSETS_URI . 'scm-tools.min.js', array( 'imagesloaded' ), null, true );
            // FULL
            wp_register_script( 'jquery-scm-js-functions', SCM_ASSETS_URI . 'scm-js-functions.js', array( 'imagesloaded' ), null, true );
            wp_enqueue_script( 'jquery-scm-js-functions' );
            wp_register_script( 'jquery-scm-functions', SCM_ASSETS_URI . 'scm-functions.js', array( 'jquery-scm-js-functions' ), null, true );
            wp_enqueue_script( 'jquery-scm-functions' );
            wp_register_script( 'jquery-scm-tools', SCM_ASSETS_URI . 'scm-tools.js', array( 'jquery-scm-functions' ), null, true );

            wp_enqueue_script( 'jquery-scm-tools' );

            if( $scm_assets_settings['tables'] ){
                // MIN
                //wp_register_script( 'jquery-scm-tables', SCM_ASSETS_URI . 'scm-tables.min.js', array( 'jquery-scm-tools' ), null, true );
                // FULL
                wp_register_script( 'jquery-scm-tables', SCM_ASSETS_URI . 'scm-tables.js', array( 'jquery-scm-tools' ), null, true );
                wp_enqueue_script( 'jquery-scm-tables' );
            }

            //if( $scm_assets_settings['ui'] ){ // DA AGGIUNGERE A WP OPTIONS

                wp_register_script( 'jquery-scm-panels', SCM_ASSETS_URI . 'scm-panels.js', array( 'jquery-scm-tools' ), null, true );
                wp_enqueue_script( 'jquery-scm-panels' );

                wp_register_script( 'jquery-scm-ui', SCM_ASSETS_URI . 'scm-ui.js', array( 'jquery-scm-tools' ), null, true );
                wp_enqueue_script( 'jquery-scm-ui' );

            //}

            // SCM Child

            $scripts = apply_filters( 'scm_assets_action_register_before_child', array() );
            if( !empty( $scripts ) ){
                foreach ($scripts as $script) {
                    if ( is_asso( $script ) && ex_attr( $script, 'name', '' ) && ex_attr( $script, 'url', '' ) ) {
                        wp_register_script( $script['name'], get_stylesheet_directory_uri() . $script['url'], array( 'jquery-scm-tools' ), null, true );
                        wp_enqueue_script( $script['name'] );
                    }
                }
            }

            wp_register_script( 'jquery-scm-child', get_stylesheet_directory_uri() . '/_assets/js/jquery.scm-child.js', array( 'jquery-scm-tools' ), null, true );
            wp_enqueue_script( 'jquery-scm-child' );

            $scripts = apply_filters( 'scm_assets_action_register_after_child', array() );
            if( !empty( $scripts ) ){
                foreach ($scripts as $script) {
                    if ( is_asso( $script ) && ex_attr( $script, 'name', '' ) && ex_attr( $script, 'url', '' ) ) {
                        wp_register_script( $script['name'], get_stylesheet_directory_uri() . $script['url'], array( 'jquery-scm-child' ), null, true );
                        wp_enqueue_script( $script['name'] );
                    }
                }
            }
            
            // SCM

            wp_register_script( 'jquery-scm', SCM_ASSETS_URI . 'scm.js', array( 'jquery-scm-child' ), null, true );
            wp_enqueue_script( 'jquery-scm' );

            /*global $wp_query;
            wp_localize_script( 'jquery-scm-tools', 'ajaxcall', array(
                'url' => admin_url( 'admin-ajax.php' ),
                //'post_id' => $post->ID,
                //'query_vars' => json_encode( $wp_query->query ),
            ));*/
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

            wp_register_script( 'jquery-scm-admin', SCM_ASSETS_URI . 'scm-admin.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-scm-admin' );

        }
    }

    // login
    if ( ! function_exists( 'scm_assets_login_register' ) ) {
        function scm_assets_login_register() {
            
            wp_register_script( 'jquery-scm-login', SCM_ASSETS_URI . 'scm-login.js', array( 'jquery' ), null, true );
            wp_enqueue_script( 'jquery-scm-login' );                

        }
    }

    /*function add_async_attribute($tag, $handle) {
        if ( 'font-awesome' !== $handle && 'font-awesome-shims' !== $handle )
            return $tag;
        return str_replace( ' src', ' defer src', $tag );
    }
    add_filter('script_loader_tag', 'add_async_attribute', 10, 2);*/

    // fontawesome
    if ( ! function_exists( 'scm_assets_register_fontawesome' ) ) {
        function scm_assets_register_fontawesome() {

            /*wp_register_script('font-awesome-shims', SCM_ASSETS_URI_ASSETS . 'font-awesome-5.0.0/v4-shims.min.js', null, null, false );
            wp_enqueue_script( 'font-awesome-shims' );
            wp_register_script('font-awesome', SCM_ASSETS_URI_ASSETS . 'font-awesome-5.0.0/bundles/everything.min.js', null, null, false );
            wp_enqueue_script( 'font-awesome' );*/

            //wp_register_style('font-awesome', SCM_ASSETS_URI_ASSETS . 'font-awesome-4.7.0/css/font-awesome.min.css', false, null );
            //wp_enqueue_style( 'font-awesome' );

            wp_register_style('font-awesome-solid', SCM_ASSETS_URI_ASSETS . 'font-awesome-5.0.0/css/fontawesome-pro-solid.css', false, null );
            wp_enqueue_style( 'font-awesome-solid' );

            wp_register_style('font-awesome-regular', SCM_ASSETS_URI_ASSETS . 'font-awesome-5.0.0/css/fontawesome-pro-regular.css', false, null );
            wp_enqueue_style( 'font-awesome-regular' );

            wp_register_style('font-awesome-light', SCM_ASSETS_URI_ASSETS . 'font-awesome-5.0.0/css/fontawesome-pro-light.css', false, null );
            wp_enqueue_style( 'font-awesome-light' );

            wp_register_style('font-awesome-brand', SCM_ASSETS_URI_ASSETS . 'font-awesome-5.0.0/css/fontawesome-pro-brands.css', false, null );
            wp_enqueue_style( 'font-awesome-brand' );

            wp_register_style('font-awesome', SCM_ASSETS_URI_ASSETS . 'font-awesome-5.0.0/css/fontawesome-pro-core.css', false, null );
            wp_enqueue_style( 'font-awesome' );



        }
    }