import style from './contactPortal.module.scss';

const ContactPortal = () => {
	return (
		<div className={style.wrapper}>
			<h1 className={style.titleHeader}>Sofie Portalen</h1>
			<div className='text-wrapper'>
				<p className={style.header}>Developer Team</p>
				<p className={style.text}>
					Ad questions and adds please contact jens at jchr@tv2.dk
				</p>
			</div>
			<button className={style.sendMail}>Send Mail</button>
		</div>
	);
};

export default ContactPortal;
