<!DOCTYPE html>
<html>
<head>
	<title>Generate Key Language For Project KSM2</title>
</head>
<body>
	<div>
		<!-- <h1>Generate Key Language For Project KSM2</h1> -->
		<form id="keyConvert_form" action="#" method="POST">
			<div>
				<textarea id="key_input" name="key_input" rows="5" cols="70"></textarea>
			</div>
			<button type="submit">Generate</button>
			<button type="reset">Refresh</button>
			<button id="clipboard" type="button">Copy to Clipboard</button>
		</form>
		<br>
		<div id="results">
			<h3>Generate Key Language For Project KSM2</h3>
			
			<div>
				<textarea id="key02_output" name="key02_output" rows="5" cols="70"></textarea>
			</div>
			<button id="clipboard_02">Copy to Clipboard</button>

			<br><br>
			<div>
				<textarea id="key03_output" name="key03_output" rows="5" cols="70"></textarea>
			</div>
			<button id="clipboard_03">Copy to Clipboard</button>

			<br><br>
			<div>
				<textarea id="key01_output" name="key01_output" rows="5" cols="70"></textarea>
			</div>
			<button id="clipboard_01">Copy to Clipboard</button>
		</div>
	</div>
</body>
	<script type="text/javascript" src="jquery.min.js"></script>
	<!-- // <script type="text/javascript" src="jquery.zclip.min.js"></script> -->
	<script type="text/javascript">
		// function copy (str)
		// {
		//     //for IE ONLY!
		//     window.clipboardData.setData('Text',str);
		// }
		// var URL = <?php echo 'http'; ?>;
		$(document).ready(function(){
			$('#keyConvert_form').on("submit", function(e) {
				// e.preventDefault();
				var data_get = $(this).serializeArray();
				var url = './generate.php';
				$.getJSON(url, data_get, function(data){
					// console.log(data);
					if(!jQuery.isEmptyObject(data)){
						$("#key01_output").val(data["key01_output"]);
						$("#key02_output").val(data["key02_output"]);
						$("#key03_output").val(data["key03_output"]);
					}	
				});

				return false;
			});

			$("#clipboard").on("click", function() {
				window.clipboardData.setData('Text', $("#key_input").val()); // for IE only!
				// window.prompt("Copy to clipboard: Ctrl+C, Enter", $("#key01_output").val());
			});

			$("#clipboard_01").on("click", function() {
				window.clipboardData.setData('Text', $("#key01_output").val()); // for IE only!
			});

			$("#clipboard_02").on("click", function() {
				window.clipboardData.setData('Text', $("#key02_output").val()); // for IE only!
			});

			$("#clipboard_03").on("click", function() {
				window.clipboardData.setData('Text', $("#key03_output").val()); // for IE only!
			});
		});
	</script>
</html>