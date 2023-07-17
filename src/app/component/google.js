import React from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { isEmpty } from 'lodash';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const Google = () => {
  const navigate = useNavigate()

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        if (!isEmpty(credentialResponse)) {
          swal('login berhasil')
          navigate('/list')
        } else {
          swal('login gagal!')
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  )
}

export default Google;