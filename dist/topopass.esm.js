import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers, utils, Wallet } from 'ethers';
import { randomBytes } from '@ethersproject/random';
import { entropyToMnemonic } from '@ethersproject/hdnode';
import CryptoJS from 'crypto-js';

var NETWORK_TOPO = function NETWORK_TOPO(network, name) {
  this.network = network;
  this.name = name;
  this.rpc = new JsonRpcProvider(network);
  this.provider = new ethers.providers.JsonRpcProvider(network);
};

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var LOCAL_STORAGE = {
  TOPOPASS_ACCOUNT_HASH: 'topopass_account_hash',
  CONTACTS: 'contacts'
};

var AUTH_TOPO = /*#__PURE__*/function () {
  function AUTH_TOPO(hash) {
    this.hash = hash;
  }
  var _proto = AUTH_TOPO.prototype;
  _proto.CHECK_AUTH = function CHECK_AUTH(password) {
    return new Promise(function (resolve, reject) {
      try {
        var ciphertext = localStorage.getItem(LOCAL_STORAGE.TOPOPASS_ACCOUNT_HASH) || 'U2FsdGVkX1/ARVszYy1NEMVLZuEL0fAquTwNDNk6ldIFZEQZzAw++j4hXKmlYwyUJq8wqbwLJ8wTFTs7k8hhACzPL+VpDRxCGTjMlFqiIERewE9fvP1x084OwTrMtXY+8415r0r/voO9txioKr2uHyACq+n7XTV2F3fruXBUiirkf7Gox0DYPEKZ6oiIz7QNkh9kOOZ10ESw4EuSppXFDg==';
        var decryptData = CryptoJS.AES.decrypt(ciphertext, password).toString(CryptoJS.enc.Utf8);
        if (decryptData) {
          var result = typeof decryptData === 'string' ? JSON.parse(decryptData) : decryptData;
          resolve(result);
        } else reject({
          phrase: null,
          path: "",
          locale: "en"
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  _proto.SET_AUTH = function SET_AUTH(mnemonic, password) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      try {
        var ciphertext = CryptoJS.AES.encrypt(mnemonic, password).toString();
        localStorage.setItem(LOCAL_STORAGE.TOPOPASS_ACCOUNT_HASH, ciphertext);
        _this.hash = ciphertext;
        resolve({
          message: 'Create auth success!',
          data: ciphertext
        });
      } catch (error) {
        reject({
          message: 'Failed create auth!',
          data: error
        });
      }
    });
  };
  return AUTH_TOPO;
}();

var ADDRESS_WALLET = /*#__PURE__*/function () {
  function ADDRESS_WALLET(address) {
    this.address = address;
  }
  var _proto = ADDRESS_WALLET.prototype;
  _proto.CHECK_ADDRESS = function CHECK_ADDRESS(address) {
    return utils.isAddress(address);
  };
  _proto.SET_CONTACT = function SET_CONTACT(address, name) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      if (_this.CHECK_ADDRESS(address)) {
        var contacts;
        if (localStorage.getItem(LOCAL_STORAGE.CONTACTS)) contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        if (contacts !== undefined) contacts.push({
          address: address,
          name: name,
          space: '',
          avatar: ''
        });else contacts = [{
          address: address,
          name: name,
          space: '',
          avatar: ''
        }];
        resolve({
          message: 'Save contact success',
          data: {
            address: address,
            name: name,
            space: '',
            avatar: ''
          }
        });
      } else {
        reject({
          message: 'Address not is validate!!',
          data: ''
        });
      }
    });
  };
  _proto.GET_LIST_CONTACT = function GET_LIST_CONTACT() {
    return new Promise(function (resolve, reject) {
      try {
        var contacts;
        if (localStorage.getItem(LOCAL_STORAGE.CONTACTS)) contacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CONTACTS) || '[]');
        resolve({
          message: 'Get list contact',
          data: contacts
        });
      } catch (error) {
        reject({
          message: 'GET failed list contact',
          data: error
        });
      }
    });
  };
  return ADDRESS_WALLET;
}();

var WALLET_TOPO = /*#__PURE__*/function () {
  function WALLET_TOPO(network) {
    this.network = network;
    this.auth = new AUTH_TOPO('');
    this.address = new ADDRESS_WALLET('');
    this.wallet = null;
    this.password = '';
  }
  var _proto = WALLET_TOPO.prototype;
  _proto.LOGIN_TOPO = function LOGIN_TOPO(password) {
    var _this = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.auth.CHECK_AUTH(password).then( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(res) {
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return Wallet.fromMnemonic(res.phrase, res.path);
                          case 2:
                            _this.walletMnemonic = _context.sent;
                            _this.wallet = _this.walletMnemonic.connect(_this.network.rpc);
                            _this.password = password;
                            resolve(true);
                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }())["catch"](function () {
                  reject(false);
                });
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };
  _proto.CREATE_SEED_PHRASE = function CREATE_SEED_PHRASE(options) {
    return new Promise( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
        var entropy, mnemonic;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                try {
                  if (!options) {
                    options = {};
                  }
                  entropy = randomBytes(16);
                  mnemonic = entropyToMnemonic(entropy, options.locale);
                  if (mnemonic) resolve(mnemonic);else reject(mnemonic);
                } catch (error) {
                  reject(error);
                }
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }());
  };
  _proto.IMPORT_SEED_PHRASE = function IMPORT_SEED_PHRASE(seedPhrase, options, password) {
    var _this2 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
        var wallet;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!options) {
                  options = {};
                }
                _context4.next = 3;
                return Wallet.fromMnemonic(seedPhrase, options.path, options.locale);
              case 3:
                wallet = _context4.sent;
                _this2.auth.SET_AUTH(JSON.stringify(wallet.mnemonic), password).then(function (res) {
                  _this2.wallet = wallet;
                  resolve(res);
                })["catch"](function (err) {
                  reject(err);
                });
              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }());
  };
  _proto.GET_BALANCE_TOPO = /*#__PURE__*/function () {
    var _GET_BALANCE_TOPO = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var balance;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.wallet.getBalance();
            case 2:
              balance = _context5.sent;
              console.log('GET_BALANCE_TOPO', balance);
              return _context5.abrupt("return", balance);
            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));
    function GET_BALANCE_TOPO() {
      return _GET_BALANCE_TOPO.apply(this, arguments);
    }
    return GET_BALANCE_TOPO;
  }();
  _proto.SEND_TRANSACTION = function SEND_TRANSACTION(to, amount, gasLimit) {
    var _this3 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
        var tx, data;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                tx = {
                  from: _this3.walletMnemonic.address,
                  to: to,
                  value: utils.parseEther(amount),
                  gasLimit: utils.hexlify(gasLimit)
                };
                if (!_this3.wallet) {
                  _context6.next = 9;
                  break;
                }
                _context6.next = 5;
                return _this3.wallet.sendTransaction(tx);
              case 5:
                data = _context6.sent;
                resolve({
                  message: 'sendTransaction',
                  data: data
                });
                _context6.next = 10;
                break;
              case 9:
                reject({
                  message: "address " + to + " is not validate!",
                  data: ''
                });
              case 10:
                _context6.next = 14;
                break;
              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](0);
              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 12]]);
      }));
      return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
      };
    }());
  };
  _proto.GET_LIST_CONTRACT = function GET_LIST_CONTRACT() {
    return new Promise(function (resolve, reject) {
      try {
        resolve({
          message: '',
          data: []
        });
      } catch (error) {
        reject({
          message: '',
          data: error
        });
      }
    });
  };
  return WALLET_TOPO;
}();

export { NETWORK_TOPO, WALLET_TOPO };
//# sourceMappingURL=topopass.esm.js.map