const elements = {
  form: '#app-form',
  text: '#app-input-text',
  unitDelimiter: '#app-input-unit-delimiter',
  blockDelimiter: '#app-input-block-delimiter',
  calculateButton: '#app-button-calculate',
  resetButton: '#app-button-reset',
  example1Button: '#app-button-example-1',
  example2Button: '#app-button-example-2',
  result: '#app-result'
};

const defaultOptions = {
  unitDelimiter: ':',
  blockDelimiter: '...'
};

const example1 = {
  text: [
    '01:58',
    '05:12',
    '04:14',
    '04:15',
    '08:15',
    '10:18',
    '...',
    '01:43',
    '02:04:49',
    '08:59',
    '03:05:03',
    '...',
    '01:58',
    '01:35',
    '04:35',
    '05:51',
    '06:39',
    '11:51',
    '...',
    '10:16',
    '10:16',
    '06:52',
    '04:53',
    '04:50',
    '14:21',
    '06:37',
    '04:29',
    '05:41',
    '...',
    '07:47',
    '07:03',
    '10:46',
    '03:16',
  ].join('\n'),
  options: defaultOptions
};

const example2 = {
  text: [
    '1§58',
    '5§12',
    '4§6',
    '9',
    'gibberish',
    'invalid*Tim§e_int§erval',
    'HURRDURR',
    '04§18',
    '8§15',
    'nope',
    'nOwAyThIsGoNnApAsS',
    '03§16',
  ].join('\n'),
  options: {
    unitDelimiter: '§',
    blockDelimiter: 'HURRDURR'
  }
};

const view_setOptions = (options) => {
  $(elements.unitDelimiter).val(options.unitDelimiter);
  $(elements.blockDelimiter).val(options.blockDelimiter);
};

const view_getOptions = () => {
  return {
    unitDelimiter: $(elements.unitDelimiter).val(),
    blockDelimiter: $(elements.blockDelimiter).val()
  };
};

const view_getText = () => $(elements.text).val();
const view_setText = (text) => $(elements.text).val(text);
const view_focusText = () => $(elements.text).focus();

const parseOptions = (options) => {
  const eols = {
    windows: '\r\n',
    unix: '\n'
  };
  return {
    unitDelimiter: options.unitDelimiter || defaultOptions.unitDelimiter,
    blockDelimiter: options.blockDelimiter || defaultOptions.blockDelimiter
  };
};

const view_showResult = (result) => {

  let html = '';

  if (result.blocks.length > 1) {
    html += 'BLOCKS:<br>'+result.blocks.join('<br>')+'<br><br>';
  }

  html += 'TOTAL:<br><strong>'+result.total+'</strong>';

  $(elements.result).removeClass('d-none').html(html);
};

const view_hideResult = () => $(elements.result).addClass('d-none');

/**
 * An "interval" array is like
 * [hours, minutes, seconds]
 * [minutes, seconds]
 * [seconds]
 * @param array intervals An array of "interval" (see above) arrays
 */
const sumIntervals = (intervals) => {

  // Calculate raw total time for these intervals
  const raw = intervals.reduce((total, interval) => {
    const [H, M, S] = total;
    let [h, m, s] = [0, 0, 0];
    const units = interval.length;
    if (units === 1) s = interval[0];
    if (units === 2) [m, s] = [interval[0], interval[1]];
    if (units === 3) [h, m, s] = [interval[0], interval[1], interval[2]];
    return [ H + h, M + m, S + s ];
  }, [0, 0, 0]);

  // Correct raw total
  let [h, m, s] = raw;

  // Correct seconds to minutes
  const sm = Math.floor(s / 60);
  s -= (sm * 60);
  m += sm;

  // Correct minutes to hours
  const mh = Math.floor(m / 60);
  m -= (mh * 60);
  h += mh;

  // Return corrected total
  return [h, m, s];

};

/** Ex.: pad(42, 5) => "00042" */
const padNumber = (num, len) => ("0".repeat(len) + num).slice(-len);

const formatInterval = (interval, delimiter) => {
  const [h, m, s] = interval.map(unit => padNumber(unit, 2));
  return h + delimiter + m + delimiter + s;
};

// https://stackoverflow.com/a/3561711/5653974
const escapeRegex = (regex) => {
  return regex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

const calculate = (text, options) => {

  const eol = '\\r?\\n';
  const blockRegex = new RegExp(eol+escapeRegex(options.blockDelimiter)+eol);

  const blocks = text
    .split(blockRegex)
    .map(block => block.split(/\r?\n/))
    .map(block => {
      return block.map(line => {
        return line
          // Split line in single time units
          .split(options.unitDelimiter)
          // Parse units as integers
          .map(unit => {
            const parsed = parseInt(unit);
            return isNaN(parsed) ? null : parsed;
          })
          // Filter out bad-formatted lines
          .filter(unit => unit !== null)
      });
    });

  const blockSums = blocks.map(block => sumIntervals(block));
  const total = sumIntervals(blockSums);
  
  return {
    blocks: blockSums.map(sum => formatInterval(sum, options.unitDelimiter)),
    total: formatInterval(total, options.unitDelimiter)
  };

};

const calculateHandler = (event) => {
  event.preventDefault();
  const text = view_getText();
  const options = parseOptions(view_getOptions());
  const result = calculate(text, options);
  view_showResult(result);
};

const resetHandler = () => {
  view_hideResult();
  view_setOptions(defaultOptions);
  view_setText('');
  view_focusText();
};

const example1Handler = () => {
  view_setText(example1.text);
  view_setOptions(example1.options);
  $(elements.form).submit();
};

const example2Handler = () => {
  view_setText(example2.text);
  view_setOptions(example2.options);
  $(elements.form).submit();
};

const bootstrap = () => {
  $(elements.form).on('submit', calculateHandler);
  $(elements.resetButton).on('click', resetHandler);
  $(elements.example1Button).on('click', example1Handler);
  $(elements.example2Button).on('click', example2Handler);
  view_setOptions(defaultOptions);
};

$(document).ready(bootstrap);
