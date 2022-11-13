"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PostComponent = void 0;
var core_1 = require("@angular/core");
var PostComponent = /** @class */ (function () {
    function PostComponent(_sanitizer, router, postsDataService) {
        var _this = this;
        this._sanitizer = _sanitizer;
        this.router = router;
        this.postsDataService = postsDataService;
        this.isAuth = false;
        this.likes = [];
        this.isLiked = this.likes.find(function (item) { return item.userId === _this.user.id; }) === -1 ? false : true;
    }
    PostComponent.prototype.ngOnInit = function () {
        console.log('user----', this.user);
        this.likes = Object.values(this.post.likes);
        this.tags = this.post.tags.split(',').map(function (tag) { return "#" + tag; });
    };
    PostComponent.prototype.onClick = function (post) {
        this.router.navigate(["posts/view/" + post.id]);
    };
    PostComponent.prototype.onEdit = function ($event, post) {
        $event.stopPropagation();
        this.router.navigate(["posts/edit/" + post.id]);
    };
    PostComponent.prototype.onDelete = function ($event, post) {
        $event.stopPropagation();
        this.postsDataService.removePost(this.post.id);
    };
    PostComponent.prototype.onLikes = function ($event) {
        $event.stopPropagation();
    };
    PostComponent.prototype.onLikesClick = function ($event, post) {
        var parent = $event.target.parentNode;
        var newPost = __assign(__assign({}, post), { likes: __spreadArrays(Array.from(post.likes), [{
                    id: new Date().getUTCMilliseconds(),
                    userId: this.user.id
                }]) });
        if (this.user.id) {
            this.isLiked = !this.isLiked;
            this.postsDataService.updateLikes(newPost, this.user.id);
            return;
        }
        parent.childNodes[0].classList.toggle('show');
    };
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "post");
    __decorate([
        core_1.Input()
    ], PostComponent.prototype, "user");
    PostComponent = __decorate([
        core_1.Component({
            selector: 'app-post',
            templateUrl: './post.component.html',
            styleUrls: ['./post.component.scss']
        })
    ], PostComponent);
    return PostComponent;
}());
exports.PostComponent = PostComponent;
