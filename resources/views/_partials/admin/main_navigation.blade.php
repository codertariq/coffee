<?php $index = 2;?>
<div class="card card-sidebar-mobile  noprint">
	<ul class="nav nav-sidebar" data-nav-type="accordion">
		<!-- Main -->
		<li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs">Main</div> <i class="icon-menu" title="Main"></i></li>
		<li class="nav-item">
			<a href="{{route('admin.dashboard')}}" class="nav-link{{ (Request::is('admin') OR Request::is('admin/dashboard')) ? ' active' : '' }}">
				<i class="icon-home4"></i>
				<span>
					{{_('Dashboard')}}
				</span>
			</a>
		</li>
	</ul>
</div>
