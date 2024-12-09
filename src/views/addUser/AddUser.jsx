import React from 'react';
import style from './addUserWrapper.module.scss';

const AddUser = () => {
	return (
		<div className={style.addUserWrapper}>
			<p className={style.heading}>Add New User</p>
			<hr />
			<form action=''>
				<div className={style.formInputs}>
					<div className={style.spacer}>
						<div className={style.inputAndLabel}>
							<label> UserName</label>
							<input
								type='text'
								placeholder='Username'
							/>
						</div>
						<div className={style.inputAndLabel}>
							<label>Password</label>
							<input
								type='password'
								placeholder='Password'
							/>
						</div>
					</div>

					<div className={style.spacer}>
						<div className={style.inputAndLabel}>
							<label htmlFor=''> Role</label>
							<select
								name='role'
								id='role'>
								<option initialvalue='true'>Select Role</option>
								<option value='admin'>Admin</option>
								<option value='user'>User</option>
							</select>
						</div>
						<div className={style.inputAndLabel}>
							<label htmlFor=''> Department</label>
							<select
								name='department'
								id='department'>
								<option initialvalue='true'>Select Department</option>
								<option value='Afd Lyd'>Afd. Lyd</option>
								<option value='Afd D'>Afd. D</option>
								<option value='Afd S'>Afd. S</option>
							</select>
						</div>
					</div>
				</div>
				<hr />
				<div className={style.userAccesRights}>
					<p className={style.subheading}>User Access Groups</p>

					<p className={style.smallText}> Group Access Rights</p>
					<button className={style.userButton}>Create Group</button>


                    <div styleName={styles.wrapper}></div>
            
					<hr />
				</div>
			</form>
		</div>
	);
};

export default AddUser;
