function loadRepos() {
   let xhttp = new XMLHttpRequest()
   xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
         document.getElementById("res").innerHTML = this.responseText
      }
   }
   xhttp.open("GET", "https://api.github.com/repos/testnakov/test-nakov-repo", true)
   xhttp.send()
}