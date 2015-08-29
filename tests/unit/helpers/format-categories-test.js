import {
  formatCategories
} from '../../../helpers/format-categories';
import { module, test } from 'qunit';

module('FormatCategoriesHelper');

test('converts array to comma-delimited list and removed underscores', function(assert) {
  var value = ["cats", "boys_before_flowers", "cars", "other things", "more things"],
      rendered = formatCategories(value),
      expected = "cats, boys before flowers, cars";
  assert.equal(rendered, expected);
});
