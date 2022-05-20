import { assert } from 'chai';
import { addTwo } from '../../../main/ts/core/AddTwo';
// This is an example of an atomic test, that is a test of some functionality separated from the editor.
describe('atomic.AddTwoTest', function () {
    it('should add 2 to any valid number', function () {
        assert.equal(addTwo(1), 3, '1 + 2 = 3, hopefully');
    });
});
//# sourceMappingURL=AddTwoTest.js.map