module.exports = function(validFields) {
  return function(req, res, next) {
    // _id is returned every time
    var projection = {
      _id: 1
    };

    var queryFields = req.query.fields || '';

    if (queryFields === '') {
      return next();
    }

    var fields = queryFields.split(',');

    fields.forEach(function(field) {
      // continue if requested field is id
      if (field === 'id' || !field) {
        return;
      }

      if (validFields.indexOf(field) === -1) {
        return next(new Error('Invalid field'));
      }

      projection[field] = 1;
    });

    req.projection = projection;

    return next();
  };
};
