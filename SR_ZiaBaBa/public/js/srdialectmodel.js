var recognizer;
var model;
var dialectRestaurantName = ['Ah Huat Restaurant', 'Fatty Restaurant', 'Noise'];
var fifoLabels = [];
var counter    = 0;

const NUM_FRAMES  = 3;
const INPUT_SHAPE = [NUM_FRAMES, 232, 1];


//Get the last say X results of the fifo and 
//ensure one of the label the mode is higher than the ddesireMode.
//Normally set the desired mode to 80% or higher of X. E.g. X = 30 than desireMode is 24 or higher.
//This is to ensure the label accepted is stable and not jumping around
// because once a while it will jump to ambience noise label
function fifoMode(desiredMode)
{
  var highestFrequency = 0;
  var predictionLabel = null;
  
  var collection = {};

  fifoLabels.forEach(function(item) {
    var frequency = collection[item];
    if (frequency == null) frequency = 0;
    collection[item] = frequency + 1;

    if (collection[item] > highestFrequency)
    {
        highestFrequency = collection[item];
        predictionLabel = item;
    }
  });

  //if ((highestFrequency >= desiredMode) && (predictionLabel < 2)){
  if (highestFrequency >= desiredMode){
    restaurantNameFromModel = dialectRestaurantName[predictionLabel];
    fifoLabels = [];
    console.log("DESIRED_MODE HIT : " + restaurantNameFromModel + " = " + collection[predictionLabel]);
  }
}


async function getMode(labelTensor)
{
  const label = (await labelTensor.data())[0];
  fifoLabels.push(label);
  
  //Limit the fifo length. Only the last X number of labels to be processed 
  if (fifoLabels.length > 30) {
    //shift is a fifo operation.
    fifoLabels.shift();
    // algorithm to get the mode. Check mode frequency is greater than desire mode
    // if higher than desire mode save result in global variable (restaurantNameFromModel)
    fifoMode(27);
  }
}

function normalize(x) {
  const mean = -100;
  const std = 10;
  return x.map(x => (x - mean) / std);
 }

function listenDialectModel()
{
  if (recognizer.isListening())
  {
    recognizer.stopListening();
    return;
  }

  recognizer.listen(async ({spectrogram: {frameSize, data}}) => 
  {
    const vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
    const input = tf.tensor(vals, [1, ...INPUT_SHAPE]);
    var probs = null;
    model.then(function (res) {
        probs = res.predict(input);
        const predLabel = probs.argMax(1);
        getMode(predLabel);
        tf.dispose([input, probs, predLabel]);
    });
  }, {
    overlapFactor: 0.999,
    includeSpectrogram: true,
    invokeCallbackOnNoiseAndUnknown: true
  });
}

async function loadSrModel()
{
//  model = tf.loadLayersModel('srmodel/dialectName.json');
  var m = tf.loadLayersModel('srmodel/dialectName.json');
  return m;
}

async function loadDialectModel()
{
  recognizer = speechCommands.create('BROWSER_FFT');
  await recognizer.ensureModelLoaded();
  model = loadSrModel();
}
