<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'test-project');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ' Pbj,Ig$Br{n/vSZj.Gi+brrgZ;jAFup|%.#(F@PYq;kPxbjAPo&{iHTIljE WhS');
define('SECURE_AUTH_KEY',  '-zc`9n^;qb1Lt?&8z->cw>Q#@;>]2eE,Z9U)u$wTjP0aOFg h4tV9Fe*s/M>tc%,');
define('LOGGED_IN_KEY',    'i6dmg4BJD7P2 l~0V u:vO}R)nhd-V1/H~O`e? S8bhw=(hz<]]`~/yW)wjcjrC@');
define('NONCE_KEY',        'PW/W<so@R8>:c&sd&HDI}<-d&NRQ7h`9:Cj;kya9*e/t`!=E|Ojg5-}]_q`c%Vz]');
define('AUTH_SALT',        'm,?eKwIkCtxEaqt=1a-jJKNq bRKXR%(K;B%Q^wWRJ(M+v`}50- |gN}<M$Q|AB7');
define('SECURE_AUTH_SALT', ',4TWk%<zp-Sru*6jr|H)Pi{u}/~p~F@n)(PsO >|T5h@P*fdb;ufC@<Cy~i>5k0)');
define('LOGGED_IN_SALT',   'M$[``=o!}/iH7=[77$T+CcY^)D*xOCytu)nAu<gEKD0Bog+so*V0$SH/INDqf@K2');
define('NONCE_SALT',       'hRp3tKc@b7XTL:FTI#>]Ndm<wH`X2:rkPM8t4,Qyk3{e1KEd*wz 6hKI^`hGfT_R');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
