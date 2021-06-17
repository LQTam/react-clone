import React from 'react'
function User({ user }) {
	return (
		<div>
			Welcome {user?.email}
		</div>
	)
}

export default User
