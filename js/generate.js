
window.onload = function () {
	  document.getElementById('file').addEventListener('change', file_change);
	  document.getElementById('copy').addEventListener('click', copy_click);
	  document.getElementById('reset').addEventListener('click', reset_click);
}

const file_change = ((e) => {
	  const data_uri = document.getElementById('data_uri');
	  const data_length = document.getElementById('data_length');
	  const file_length = document.getElementById('file_length');
	  const srcs = document.getElementsByClassName('src');
	  const file = e.target.files[0];

	  const reader = new FileReader();

	  reader.addEventListener("load", () => {
		      data_uri.value = reader.result;
		      data_length.textContent = get_target_size(data_uri.value.length);
		      file_length.textContent = get_target_size(file.size);
		      Array.from(srcs).forEach((elm)=> elm.textContent = data_uri.value);
		    });

	  if (file) {
		      reader.readAsDataURL(file);
		      data_uri.disabled = false;
		    } else {
			        data_uri.value = "";
			        data_uri.disabled = true;
			      }
});

const copy_click = (e) => {
	  const data_uri = document.getElementById('data_uri');
	  data_uri.select();
	  document.execCommand("copy");
}

const reset_click = (e) => {
	  var inputfile = document.getElementById('file');
	  inputfile.value = '';
	  var data_uri = document.getElementById('data_uri');
	  data_uri.value = '';
	  data_uri.disabled = true;
}


const get_target_size = (size) => {
	  const kb = 1024
	  const mb = kb ** 2
	  const gb = kb ** 3
	  const tb = kb ** 4
	  var target = null;
	  var unit = 'B';

	  if (size >= tb) {
		      target = tb
		      unit = 'TB'
		    } else if (size >= gb) {
			        target = gb
			        unit = 'GB'
			      } else if (size >= mb) {
				          target = mb
				          unit = 'MB'
				        } else if (size >= kb) {
						    target = kb
						    unit = 'KB'
						  }
	  const newSize = target !== null ? Math.floor((size / target) * 100) / 100 : size
	  return `${newSize} ${unit}`
}
