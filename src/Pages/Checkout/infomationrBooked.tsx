import React, { Fragment, useState } from "react";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'configStore'
import { getBookedUser } from 'Slices/inforBooked'
import Swal from 'sweetalert2'



const infomationrBooked = () => {
  return (
    <div>
      <h1>Infor</h1>
    </div>
  );
}

export default infomationrBooked;
