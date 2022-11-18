const addButton = document.getElementById("add");
const jobsContent = document.getElementById("jobs-content");
const spanCounter = document.getElementById("counter");

let localStrg = JSON.parse(localStorage.getItem("jobArray"))
let jobArray;
(localStrg === null )? jobArray = []: jobArray = localStrg
let counter = jobArray.length;

function readFromLocalStorage(jobArray){
    jobArray.forEach(item => {
        console.log(item);
        let div = document.createElement("div");
        // set unique id
        const {counter} = item
        console.log(counter);
        div.id = counter;
        div.classList.add("add-job-style");
        jobsContent.prepend(div);
        div.innerHTML = "job" + counter;
      // showing in counter span
      spanCounter.innerHTML = counter;
    })
}

readFromLocalStorage(jobArray)
addButton.addEventListener("click", () => {
  let jobObject = {};
  counter++;
  let div = document.createElement("div");
  div.innerHTML = "job" + counter;
  // set unique id
  div.id = counter;
  div.classList.add("add-job-style");
  jobsContent.prepend(div);
  // showing in counter span
  spanCounter.innerHTML = counter;
  // setting to local storage
  jobObject["counter"] = counter;
  jobArray.push(jobObject);
  window.localStorage.setItem("jobArray", JSON.stringify(jobArray));
});



// add to finish job
const finishJobContent = document.getElementById("finish-job-content")
jobsContent.addEventListener('click', (e) => {
    const clickedJob = e.target
    console.log(clickedJob)
    // remove from job
    clickedJob.remove()
    counter--
    spanCounter.innerHTML = counter;
    // append to finish job
    finishJobContent.prepend(clickedJob)

    //delete from local storage
    const localStorageJobsArray = JSON.parse(localStorage.getItem("jobArray"))
    const arr = localStorageJobsArray.filter((obj) => obj.counter != clickedJob.id)
    localStorage.setItem("jobArray",JSON.stringify(arr))
    jobArray = JSON.parse(localStorage.getItem("jobArray"))
})


// clean the finish list
const clean = document.getElementById("clean")
clean.addEventListener('click', () => {

    finishJobContent.innerHTML = ""
})