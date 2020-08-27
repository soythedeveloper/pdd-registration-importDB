$("#btn-migrate-to-firebase").on("click", function () {
  $(this).removeClass("btn-primary");
  $(this).addClass("btn-warning");
  $(this).text("Migration in progress...");
  $("#progression").removeClass("invisible");
  $("#progression").addClass("visible");
  const worker = new Worker("/js/import-worker.js");
  worker.postMessage("[From Main]: Hey Worker, you can start now.");
  worker.onmessage = handleReceivedMessage;
  worker.onerror = handleWorkerError;
});

function handleReceivedMessage(event) {
  console.log(event.data);
  $("#btn-migrate-to-firebase").removeClass("btn-warning");
  $("#btn-migrate-to-firebase").addClass("btn-success");
  $("#btn-migrate-to-firebase").text("Migration Finished with success");
  $("#progression").removeClass("visible");
  $("#progression").addClass("invisible");
}

function handleWorkerError(error) {
  console.log(error);
  $("#btn-migrate-to-firebase").removeClass("btn-warning");
  $("#btn-migrate-to-firebase").addClass("btn-danger");
  $("#btn-migrate-to-firebase").text("Error while Migrating");
  $("#progression").removeClass("visible");
  $("#progression").addClass("invisible");
}
