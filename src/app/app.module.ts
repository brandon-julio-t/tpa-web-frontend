import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegisterPhaseOneComponent } from './components/register-phase-one/register-phase-one.component';
import { RegisterPhaseTwoComponent } from './components/register-phase-two/register-phase-two.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminManageGamesComponent } from './pages/admin-manage-games/admin-manage-games.component';
import { AdminManagePromoAndDiscountComponent } from './pages/admin-manage-promo-and-discount/admin-manage-promo-and-discount.component';
import { AdminManageUsersComponent } from './pages/admin-manage-users/admin-manage-users.component';
import { AdminViewReportsComponent } from './pages/admin-view-reports/admin-view-reports.component';
import { UnsuspendRequestComponent } from './pages/unsuspend-request/unsuspend-request.component';
import { AdminManageUnsuspendRequestsComponent } from './pages/admin-manage-unsuspend-requests/admin-manage-unsuspend-requests.component';
import { AdminGamesCreateComponent } from './pages/admin-games-create/admin-games-create.component';
import { AdminGamesUpdateComponent } from './pages/admin-games-update/admin-games-update.component';
import { AdminPromosCreateComponent } from './pages/admin-promos-create/admin-promos-create.component';
import { AdminPromosUpdateComponent } from './pages/admin-promos-update/admin-promos-update.component';
import { TopUpComponent } from './pages/top-up/top-up.component';
import { ChatComponent } from './pages/chat/chat.component';
import { PointsShopComponent } from './pages/points-shop/points-shop.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeFeaturedAndRecommendedComponent } from './components/home-featured-and-recommended/home-featured-and-recommended.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { GameSearchComponent } from './pages/game-search/game-search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { GamePurchaseComponent } from './pages/game-purchase/game-purchase.component';
import { GameGiftComponent } from './pages/game-gift/game-gift.component';
import { StreamingComponent } from './pages/streaming/streaming.component';
import { WatchStreamComponent } from './pages/watch-stream/watch-stream.component';
import { HomeStreamingNowComponent } from './pages/home-streaming-now/home-streaming-now.component';
import { HomeSideBarComponent } from './components/home-side-bar/home-side-bar.component';
import { GameDetailReviewsComponent } from './components/game-detail-reviews/game-detail-reviews.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeSpecialOffersComponent } from './components/home-special-offers/home-special-offers.component';
import { HomeCommunityRecommendedComponent } from './components/home-community-recommended/home-community-recommended.component';
import { HomeCommunityRecommendedReviewComponent } from './components/home-community-recommended-review/home-community-recommended-review.component';
import { HomeCategoriesContainerComponent } from './components/home-categories-container/home-categories-container.component';
import { HomeCategoriesContentComponent } from './components/home-categories-content/home-categories-content.component';
import { HomeCategoriesTopSellersComponent } from './components/home-categories-top-sellers/home-categories-top-sellers.component';
import { HomeCategoriesSpecialsComponent } from './components/home-categories-specials/home-categories-specials.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { FriendsAddComponent } from './components/friends-add/friends-add.component';
import { FriendsPendingInvitesComponent } from './components/friends-pending-invites/friends-pending-invites.component';
import { FriendsAllComponent } from './components/friends-all/friends-all.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { GameDetailReviewCreateComponent } from './components/game-detail-review-create/game-detail-review-create.component';
import { DiscoveryQueueNewReleasesComponent } from './pages/discovery-queue-new-releases/discovery-queue-new-releases.component';
import { CommunityComponent } from './pages/community/community.component';
import { CommunityImagesAndVideosComponent } from './components/community-images-and-videos/community-images-and-videos.component';
import { CommunityImageAndVideoCreateComponent } from './components/community-image-and-video-create/community-image-and-video-create.component';
import { CommunityImageAndVideoDetailComponent } from './components/community-image-and-video-detail/community-image-and-video-detail.component';
import { CommunityReviewsComponent } from './components/community-reviews/community-reviews.component';
import { CommunityReviewDetailComponent } from './components/community-review-detail/community-review-detail.component';
import { CommunityDiscussionsComponent } from './components/community-discussions/community-discussions.component';
import { CommunityDiscussionDetailComponent } from './components/community-discussion-detail/community-discussion-detail.component';
import { CommunityDiscussionCreateComponent } from './components/community-discussion-create/community-discussion-create.component';
import { PointsShopItemComponent } from './components/points-shop-item/points-shop-item.component';
import { ProfileEditProfileBackgroundComponent } from './components/profile-edit-profile-background/profile-edit-profile-background.component';
import { ProfileEditMiniProfileBackgroundComponent } from './components/profile-edit-mini-profile-background/profile-edit-mini-profile-background.component';
import { ProfileEditAvatarBorderComponent } from './components/profile-edit-avatar-border/profile-edit-avatar-border.component';
import { ProfileEditFeaturedBadgeComponent } from './components/profile-edit-featured-badge/profile-edit-featured-badge.component';
import { MarketComponent } from './pages/market/market.component';
import { InventoryComponent } from './pages/inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    RegisterPhaseOneComponent,
    RegisterPhaseTwoComponent,
    ProfileComponent,
    ProfileEditComponent,
    SubmitButtonComponent,
    LoginAdminComponent,
    AdminComponent,
    AdminManageGamesComponent,
    AdminManagePromoAndDiscountComponent,
    AdminManageUsersComponent,
    AdminViewReportsComponent,
    UnsuspendRequestComponent,
    AdminManageUnsuspendRequestsComponent,
    AdminGamesCreateComponent,
    AdminGamesUpdateComponent,
    AdminPromosCreateComponent,
    AdminPromosUpdateComponent,
    TopUpComponent,
    ChatComponent,
    PointsShopComponent,
    PaginationComponent,
    ChatAreaComponent,
    HomeComponent,
    HomeFeaturedAndRecommendedComponent,
    GameDetailComponent,
    GameSearchComponent,
    SearchBarComponent,
    CartComponent,
    WishlistComponent,
    GamePurchaseComponent,
    GameGiftComponent,
    StreamingComponent,
    WatchStreamComponent,
    HomeStreamingNowComponent,
    HomeSideBarComponent,
    GameDetailReviewsComponent,
    HomeSpecialOffersComponent,
    HomeCommunityRecommendedComponent,
    HomeCommunityRecommendedReviewComponent,
    HomeCategoriesContainerComponent,
    HomeCategoriesContentComponent,
    HomeCategoriesTopSellersComponent,
    HomeCategoriesSpecialsComponent,
    FriendsComponent,
    FriendsAddComponent,
    FriendsPendingInvitesComponent,
    FriendsAllComponent,
    NotificationsComponent,
    GameDetailReviewCreateComponent,
    DiscoveryQueueNewReleasesComponent,
    CommunityComponent,
    CommunityImagesAndVideosComponent,
    CommunityImageAndVideoCreateComponent,
    CommunityImageAndVideoDetailComponent,
    CommunityReviewsComponent,
    CommunityReviewDetailComponent,
    CommunityDiscussionsComponent,
    CommunityDiscussionDetailComponent,
    CommunityDiscussionCreateComponent,
    PointsShopItemComponent,
    ProfileEditProfileBackgroundComponent,
    ProfileEditMiniProfileBackgroundComponent,
    ProfileEditAvatarBorderComponent,
    ProfileEditFeaturedBadgeComponent,
    MarketComponent,
    InventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ReactiveFormsModule,
    RecaptchaModule,
    FontAwesomeModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
