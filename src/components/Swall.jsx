// SweetAlert.js
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Swal from "sweetalert2";

const SweetAlert = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showAlert(options) {
      Swal.fire({
        ...options,
        didOpen: () => {
          if (options.onOpen) {
            options.onOpen();
          }
        },
        didClose: () => {
          if (options.onClose) {
            options.onClose();
          }
        },
      });
    },
  }));

  return null;
});

export default SweetAlert;
