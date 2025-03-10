import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminManageGamesComponent } from './pages/admin-manage-games/admin-manage-games.component';
import { AdminManagePromoAndDiscountComponent } from './pages/admin-manage-promo-and-discount/admin-manage-promo-and-discount.component';
import { AdminManageUsersComponent } from './pages/admin-manage-users/admin-manage-users.component';
import { AdminComponent } from './pages/admin/admin.component';
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
import { HomeComponent } from './pages/home/home.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { GameSearchComponent } from './pages/game-search/game-search.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { GamePurchaseComponent } from './pages/game-purchase/game-purchase.component';
import { GameGiftComponent } from './pages/game-gift/game-gift.component';
import { WatchStreamComponent } from './pages/watch-stream/watch-stream.component';
import { StreamingComponent } from './pages/streaming/streaming.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { DiscoveryQueueNewReleasesComponent } from './pages/discovery-queue-new-releases/discovery-queue-new-releases.component';
import { CommunityComponent } from './pages/community/community.component';
import { CommunityImageAndVideoCreateComponent } from './components/community-image-and-video-create/community-image-and-video-create.component';
import { CommunityImageAndVideoDetailComponent } from './components/community-image-and-video-detail/community-image-and-video-detail.component';
import { CommunityReviewDetailComponent } from './components/community-review-detail/community-review-detail.component';
import { CommunityDiscussionDetailComponent } from './components/community-discussion-detail/community-discussion-detail.component';
import { CommunityDiscussionCreateComponent } from './components/community-discussion-create/community-discussion-create.component';
import { ProfileEditAvatarBorderComponent } from './components/profile-edit-avatar-border/profile-edit-avatar-border.component';
import { ProfileEditFeaturedBadgeComponent } from './components/profile-edit-featured-badge/profile-edit-featured-badge.component';
import { ProfileEditMiniProfileBackgroundComponent } from './components/profile-edit-mini-profile-background/profile-edit-mini-profile-background.component';
import { ProfileEditProfileBackgroundComponent } from './components/profile-edit-profile-background/profile-edit-profile-background.component';
import { MarketComponent } from './pages/market/market.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { MarketDetailComponent } from './pages/market-detail/market-detail.component';
import { BroadcastComponent } from './pages/broadcast/broadcast.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'inventory', component: InventoryComponent },
      { path: 'points-shop', component: PointsShopComponent },
      { path: 'broadcast', component: BroadcastComponent },
      {
        path: 'community',
        children: [
          {
            path: 'market',
            children: [
              {
                path: '',
                component: MarketComponent,
              },
              {
                path: ':id',
                component: MarketDetailComponent,
              },
            ],
          },
          { path: ':tab', component: CommunityComponent },
        ],
      },
      {
        path: 'create-community-images-and-videos',
        component: CommunityImageAndVideoCreateComponent,
      },
      {
        path: 'community-images-and-videos/:id',
        component: CommunityImageAndVideoDetailComponent,
      },
      {
        path: 'community-reviews/:id',
        component: CommunityReviewDetailComponent,
      },
      {
        path: 'create-community-discussions',
        component: CommunityDiscussionCreateComponent,
      },
      {
        path: 'community-discussions/:id',
        component: CommunityDiscussionDetailComponent,
      },
      {
        path: 'discover',
        children: [
          {
            path: 'new-releases',
            component: DiscoveryQueueNewReleasesComponent,
          },
        ],
      },
      {
        path: 'search',
        component: GameSearchComponent,
      },
      { path: 'friends', component: FriendsComponent },
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          { path: 'top-up', component: TopUpComponent },
          { path: 'chat', component: ChatComponent },
          { path: 'streaming', component: StreamingComponent },
          {
            path: 'watch-stream/:accountName',
            component: WatchStreamComponent,
          },
          {
            path: 'cart',
            children: [
              { path: '', component: CartComponent },
              { path: 'purchase', component: GamePurchaseComponent },
              { path: 'gift', component: GameGiftComponent },
            ],
          },
          { path: 'wishlist', component: WishlistComponent },
        ],
      },
      {
        path: 'game',
        children: [{ path: ':id', component: GameDetailComponent }],
      },
    ],
  },
  {
    path: 'profile',
    children: [
      { path: ':customUrl', component: ProfileComponent },
      {
        path: 'edit/:customUrl',
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-profile-background/:customUrl',
        component: ProfileEditProfileBackgroundComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-mini-profile-background/:customUrl',
        component: ProfileEditMiniProfileBackgroundComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-featured-badge/:customUrl',
        component: ProfileEditFeaturedBadgeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-avatar-border/:customUrl',
        component: ProfileEditAvatarBorderComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: 'login', component: LoginAdminComponent },
      {
        path: '',
        canActivate: [AdminGuard],
        children: [
          { path: '', component: AdminComponent },
          {
            path: 'games',
            children: [
              { path: '', component: AdminManageGamesComponent },
              { path: 'create', component: AdminGamesCreateComponent },
              { path: 'update/:id', component: AdminGamesUpdateComponent },
            ],
          },
          {
            path: 'promo-and-discount',
            component: AdminManagePromoAndDiscountComponent,
          },
          {
            path: 'promo-and-discount/create',
            component: AdminPromosCreateComponent,
          },
          {
            path: 'promo-and-discount/update/:id',
            component: AdminPromosUpdateComponent,
          },
          {
            path: 'users',
            children: [
              { path: '', component: AdminManageUsersComponent },
              { path: 'reports/:id', component: AdminViewReportsComponent },
              {
                path: 'unsuspend-requests',
                component: AdminManageUnsuspendRequestsComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unsuspend-request', component: UnsuspendRequestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
