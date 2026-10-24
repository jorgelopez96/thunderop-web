import type { Locale } from './locales.js';

// [revisar]/[review]: frases agregadas por fuera del pedido, para que las mire la revisión legal (no sacarlas sin esa revisión).
// Textos de las páginas de cuenta (/entrar, /crear-cuenta, /verificar, /olvide, /completar, /cuenta) y de los borradores legales.
type Seccion = { titulo: string; parrafos: string[] };

const es = {
	comun: {
		email: 'Email', usuario: 'Usuario', apodo: 'Apodo', clave: 'Contraseña', nacimiento: 'Fecha de nacimiento',
		codigo: 'Código', volver: 'Volver al inicio', reenviar: 'Reenviar código', segundos: 's', irEntrar: 'Ir a entrar',
		repetir: 'Repetí la contraseña', ver: 'Mostrar contraseña', ocultar: 'Ocultar contraseña'
	},
	requisitos: { titulo: 'Requisitos de la contraseña', largo: '8 caracteres o más', mayuscula: 'Una mayúscula', numero: 'Un número', especial: 'Un carácter especial' },
	terminos: { antes: 'Acepto los', terminos: 'términos', medio: 'y la', privacidad: 'política de privacidad' },
	entrar: {
		titulo: 'Entrar a Thunderop', identidad: 'Usuario o email', recordar: 'Recordar mi cuenta', enviar: 'Entrar',
		google: 'Entrar con Google', o: 'o entrá con', olvide: 'Olvidé mi contraseña',
		confirmar: '¿Tenés una cuenta sin confirmar? Confirmala', sinCuenta: '¿No tenés cuenta?', crear: 'Creá una'
	},
	crear: { titulo: 'Crear cuenta', enviar: 'Crear cuenta', yaTengo: '¿Ya tenés cuenta?', entrar: 'Entrá',
		phUsuario: 'No se puede cambiar después', phApodo: 'Cómo te ven los demás' },
	verificar: {
		titulo: 'Confirmá tu cuenta', cuerpo: 'Te mandamos un código de 6 dígitos por mail. Vence en 10 minutos.',
		enviar: 'Confirmar', nuevo: 'Te mandamos un código nuevo.', listo: 'Cuenta confirmada. Ya podés entrar.'
	},
	olvide: {
		titulo: 'Olvidé mi contraseña', pedir: 'Poné tu email y te mandamos un código para elegir una contraseña nueva.',
		mandar: 'Mandar código', llego: 'Si el email tiene una cuenta, te llegó un código de 6 dígitos.',
		nueva: 'Contraseña nueva', cambiar: 'Cambiar contraseña', listo: 'Contraseña cambiada. Ya podés entrar.'
	},
	completar: {
		titulo: 'Completá tu cuenta', invitacion: 'Thunderop es solo con invitación. Ingresá el código que te pasaron.',
		codigoInvitacion: 'Código de invitación', perfil: 'Elegí tu usuario (no se puede cambiar después) y poné tu fecha de nacimiento.',
		terminos: 'Actualizamos los términos y la política de privacidad. Para seguir tenés que aceptarlos.', seguir: 'Continuar'
	},
	cuenta: {
		titulo: 'Tu cuenta', cargando: 'Cargando…', reintentar: 'Reintentar', salir: 'Cerrar sesión',
		incompleta: 'Tu cuenta todavía no está completa:', verificar: 'Confirmar mi email', completar: 'Completar mi cuenta',
		lista: 'Tu cuenta está lista.', descargar: 'Descargar Thunderop para Windows', descargando: 'Revisando…',
		falloDescarga: 'No se pudo preparar la descarga. Probá de nuevo.',
		falta: { verificar: 'Confirmar tu email', invitacion: 'Poner tu código de invitación', terminos: 'Aceptar los términos vigentes', perfil: 'Elegir tu usuario y tu fecha de nacimiento' }
	},
	errores: {
		conexion: 'No se pudo conectar con el servidor.', completa: 'Completá tu cuenta para seguir.',
		usuarioRepetido: 'Ese usuario ya existe, probá con otro.', emailRepetido: 'Ese email ya está registrado.', email: 'El email no es válido.',
		usuario: 'El usuario tiene que tener de 3 a 20 caracteres: letras sin acentos, números, punto o guion bajo.',
		clave: 'La contraseña necesita 8 caracteres, una mayúscula, un número y un carácter especial.',
		edad: 'Tenés que tener al menos 13 años para usar Thunderop.', fecha: 'La fecha de nacimiento no es válida.',
		apodo: 'El apodo debe tener entre 1 y 32 caracteres.', aceptar: 'Tenés que aceptar los términos para seguir.',
		datos: 'Usuario, email o contraseña incorrectos.', intentos: 'Demasiados intentos, esperá un momento.',
		codigo: 'El código no es válido o venció.', invitacion: 'El código de invitación no es válido.',
		popup: 'Permití las ventanas emergentes para entrar con Google.', noCoinciden: 'Las contraseñas no coinciden.'
	},
	legal: {
		borrador: 'Borrador — pendiente de revisión legal', version: 'Versión 1 · 23 de octubre de 2026',
		terminos: {
			titulo: 'Términos y condiciones',
			secciones: [
				{ titulo: 'Un servicio en beta', parrafos: ['Thunderop está en beta: puede tener fallas, cambiar o dejar de estar disponible por momentos. Por ahora se entra solo con invitación.'] },
				{ titulo: 'Edad mínima', parrafos: ['Para usar Thunderop tenés que tener al menos 13 años. Las cuentas de personas de 13 a 17 años son cuentas de menores: tu madre, padre o tutor tiene que estar de acuerdo con que la uses [revisar], y algunas funciones pueden estar limitadas [revisar].'] },
				{ titulo: 'Tu cuenta', parrafos: ['Los datos que pongas al crear la cuenta tienen que ser verdaderos. El usuario no se puede cambiar después. Cuidá tu contraseña: lo que pase con tu cuenta es tu responsabilidad.'] },
				{ titulo: 'Lo que no está permitido', parrafos: ['Acosar, amenazar o molestar a otras personas.', 'Compartir contenido sexual con menores, de cualquier tipo.', 'Compartir contenido ilegal.', 'Mandar spam.', 'Hacerte pasar por otra persona.'] },
				{ titulo: 'Suspensión y baneo', parrafos: ['Mentir con tu edad u otros datos, o romper estas reglas, puede terminar en la suspensión de tu cuenta o en un baneo.'] },
				{ titulo: 'Tus datos', parrafos: ['Qué datos guardamos y para qué está en la política de privacidad. Podés pedir que borremos tu cuenta en cualquier momento.'] },
				{ titulo: 'Cambios', parrafos: ['Si cambiamos estos términos, publicamos una versión nueva y te pedimos que la aceptes para seguir usando Thunderop.'] },
				{ titulo: 'Contacto', parrafos: ['Para cualquier consulta, escribinos a soporte@thunderop.com.'] }
			] as Seccion[]
		},
		privacidad: {
			titulo: 'Política de privacidad',
			secciones: [
				{ titulo: 'Un servicio en beta', parrafos: ['Thunderop está en beta. Esta política puede cambiar; si cambia, te avisamos y te pedimos que aceptes la versión nueva.'] },
				{ titulo: 'Qué datos guardamos', parrafos: ['Tu email, tu usuario, tu apodo, tu fecha de nacimiento y los mensajes y archivos que subís.',
					'Si transmitís tu pantalla, un registro técnico de cada transmisión, vinculado a tu cuenta: versión de la app, modelo de la placa de video, qué compresor se usó, cuadros por segundo, velocidad, errores y el código de salida de la transmisión. No incluye imágenes, nombres de ventanas ni de programas.'] },
				{ titulo: 'Para qué los usamos', parrafos: [
					'El email, para que entres a tu cuenta y para mandarte los códigos de confirmación y de cambio de contraseña.',
					'El usuario y el apodo, para que otras personas te encuentren y sepan quién sos.',
					'La fecha de nacimiento, para comprobar la edad mínima y saber si la cuenta es de un menor. No se le muestra a nadie [revisar].',
					'Los mensajes y archivos, para mostrárselos a las personas con las que los compartís.',
					'El registro técnico de las transmisiones, para encontrar y arreglar fallas. Solo lo ve el equipo de Thunderop y se borra a los 30 días.'
				] },
				{ titulo: 'Cuentas sin confirmar', parrafos: ['Si no confirmás tu email, la cuenta y sus datos se borran a las 24 horas.'] },
				{ titulo: 'Borrar tus datos', parrafos: ['Podés pedir que borremos tu cuenta y tus datos escribiendo a soporte@thunderop.com desde el email de tu cuenta.'] },
				{ titulo: 'Contacto', parrafos: ['Para cualquier consulta sobre tus datos, escribinos a soporte@thunderop.com.'] }
			] as Seccion[]
		}
	}
};

type Mensajes = typeof es;

const en: Mensajes = {
	comun: {
		email: 'Email', usuario: 'Username', apodo: 'Display name', clave: 'Password', nacimiento: 'Date of birth',
		codigo: 'Code', volver: 'Back to home', reenviar: 'Resend code', segundos: 's', irEntrar: 'Go to log in',
		repetir: 'Repeat password', ver: 'Show password', ocultar: 'Hide password'
	},
	requisitos: { titulo: 'Password requirements', largo: '8 characters or more', mayuscula: 'One uppercase letter', numero: 'One number', especial: 'One special character' },
	terminos: { antes: 'I accept the', terminos: 'terms', medio: 'and the', privacidad: 'privacy policy' },
	entrar: {
		titulo: 'Log in to Thunderop', identidad: 'Username or email', recordar: 'Remember me', enviar: 'Log in',
		google: 'Log in with Google', o: 'or log in with', olvide: 'I forgot my password',
		confirmar: 'Have an unconfirmed account? Confirm it', sinCuenta: 'No account yet?', crear: 'Create one'
	},
	crear: { titulo: 'Create account', enviar: 'Create account', yaTengo: 'Already have an account?', entrar: 'Log in',
		phUsuario: 'Can’t be changed later', phApodo: 'How others see you' },
	verificar: {
		titulo: 'Confirm your account', cuerpo: 'We emailed you a 6-digit code. It expires in 10 minutes.',
		enviar: 'Confirm', nuevo: 'We sent you a new code.', listo: 'Account confirmed. You can log in now.'
	},
	olvide: {
		titulo: 'I forgot my password', pedir: 'Enter your email and we will send you a code to choose a new password.',
		mandar: 'Send code', llego: 'If that email has an account, a 6-digit code is on its way.',
		nueva: 'New password', cambiar: 'Change password', listo: 'Password changed. You can log in now.'
	},
	completar: {
		titulo: 'Finish your account', invitacion: 'Thunderop is invitation only. Enter the code you were given.',
		codigoInvitacion: 'Invitation code', perfil: 'Choose your username (it cannot be changed later) and enter your date of birth.',
		terminos: 'We updated the terms and the privacy policy. Accept them to continue.', seguir: 'Continue'
	},
	cuenta: {
		titulo: 'Your account', cargando: 'Loading…', reintentar: 'Try again', salir: 'Log out',
		incompleta: 'Your account is not complete yet:', verificar: 'Confirm my email', completar: 'Finish my account',
		lista: 'Your account is ready.', descargar: 'Download Thunderop for Windows', descargando: 'Checking…',
		falloDescarga: 'Could not prepare the download. Try again.',
		falta: { verificar: 'Confirm your email', invitacion: 'Enter your invitation code', terminos: 'Accept the current terms', perfil: 'Choose your username and date of birth' }
	},
	errores: {
		conexion: 'Could not reach the server.', completa: 'Finish your account to continue.',
		usuarioRepetido: 'That username is taken, try another one.', emailRepetido: 'That email is already registered.', email: 'That email is not valid.',
		usuario: 'Usernames have 3 to 20 characters: unaccented letters, numbers, dot or underscore.',
		clave: 'Passwords need 8 characters, an uppercase letter, a number and a special character.',
		edad: 'You must be at least 13 to use Thunderop.', fecha: 'That date of birth is not valid.',
		apodo: 'Display names have 1 to 32 characters.', aceptar: 'You need to accept the terms to continue.',
		datos: 'Wrong username, email or password.', intentos: 'Too many attempts, wait a moment.',
		codigo: 'That code is not valid or has expired.', invitacion: 'That invitation code is not valid.',
		popup: 'Allow pop-ups to log in with Google.', noCoinciden: 'Passwords don’t match.'
	},
	legal: {
		borrador: 'Draft — pending legal review', version: 'Version 1 · October 23, 2026',
		terminos: {
			titulo: 'Terms of Service',
			secciones: [
				{ titulo: 'A beta service', parrafos: ['Thunderop is in beta: it may have bugs, change, or be unavailable at times. For now it is invitation only.'] },
				{ titulo: 'Minimum age', parrafos: ['You must be at least 13 to use Thunderop. Accounts of people aged 13 to 17 are minor accounts: your parent or guardian must agree to you using it [review], and some features may be limited [review].'] },
				{ titulo: 'Your account', parrafos: ['The information you give when creating your account must be true. Your username cannot be changed later. Keep your password safe: what happens with your account is your responsibility.'] },
				{ titulo: 'What is not allowed', parrafos: ['Harassing, threatening or bothering other people.', 'Sharing sexual content involving minors, of any kind.', 'Sharing illegal content.', 'Sending spam.', 'Impersonating someone else.'] },
				{ titulo: 'Suspension and bans', parrafos: ['Lying about your age or other information, or breaking these rules, can lead to your account being suspended or banned.'] },
				{ titulo: 'Your data', parrafos: ['What data we keep and why is in the privacy policy. You can ask us to delete your account at any time.'] },
				{ titulo: 'Changes', parrafos: ['If we change these terms, we publish a new version and ask you to accept it to keep using Thunderop.'] },
				{ titulo: 'Contact', parrafos: ['For any question, write to soporte@thunderop.com.'] }
			]
		},
		privacidad: {
			titulo: 'Privacy Policy',
			secciones: [
				{ titulo: 'A beta service', parrafos: ['Thunderop is in beta. This policy may change; if it does, we will let you know and ask you to accept the new version.'] },
				{ titulo: 'What data we keep', parrafos: ['Your email, your username, your display name, your date of birth, and the messages and files you upload.',
					'If you share your screen, a technical log of each stream, linked to your account: app version, graphics card model, which encoder was used, frames per second, speed, errors, and the exit code of the stream. It does not include images or the names of windows or programs.'] },
				{ titulo: 'What we use it for', parrafos: [
					'Your email, so you can log in and so we can send you confirmation and password-change codes.',
					'Your username and display name, so other people can find you and know who you are.',
					'Your date of birth, to check the minimum age and whether the account belongs to a minor. It is not shown to anyone [review].',
					'Your messages and files, to show them to the people you share them with.',
					'The technical log of streams, to find and fix faults. Only the Thunderop team can see it, and it is deleted after 30 days.'
				] },
				{ titulo: 'Unconfirmed accounts', parrafos: ['If you do not confirm your email, the account and its data are deleted after 24 hours.'] },
				{ titulo: 'Deleting your data', parrafos: ['You can ask us to delete your account and your data by writing to soporte@thunderop.com from your account email.'] },
				{ titulo: 'Contact', parrafos: ['For any question about your data, write to soporte@thunderop.com.'] }
			]
		}
	}
};

export const cuentaMessages: Record<Locale, Mensajes> = { es, en };
export type CuentaMensajes = Mensajes;
