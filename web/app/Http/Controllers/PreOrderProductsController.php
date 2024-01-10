<?php

namespace App\Http\Controllers;

use App\Models\PreOrderProducts;
use Illuminate\Http\Request;
use SebastianBergmann\Type\NullType;

class PreOrderProductsController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $preOrderProducts = PreOrderProducts::where('shop', $shop)->get();
        return response()->json([
            'data' => $preOrderProducts
        ], 200);
    }

    public function store(Request $request)
    {

        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $startDate = '';
        if($request->start_date == "null" || $request->start_date == NULL) {
            $startDate = NULL;
        } else {
            $startDate = date('Y-m-d H:i:s', strtotime($request->start_date));
        }

        $endDate = '';
        if($request->end_date == "null" || $request->end_date == NULL) {
            $endDate = NULL;
        } else {
            $endDate = date('Y-m-d H:i:s', strtotime($request->end_date));
        }

        $displayMessage = $request->display_message == 1 ? 1 : 0;
        $displayBadge = $request->display_badge == 1 ? 1 : 0;

        $preOrderProducts = PreOrderProducts::create([
            'shop'              => $shop,
            'product_id'        => $request->product_id,
            'variant_id'        => $request->variant_id ?? null,
            'title'             => $request->title,
            'start_date'        => $startDate,
            'end_date'          => $endDate,
            'order_limit'       => $request->order_limit ?? null,
            'display_message'   => $displayMessage,
            'display_badge'     => $displayBadge
        ]);

        return response()->json([
            'message' => 'Product Saved Successfully',
            'data' => $preOrderProducts
        ], 201);
    }

    public function update(Request $request)
    {
        $session = $request->get('shopifySession');
        $shop = $session->getShop();

        $start_date = $request->start_date != "null" ? date('Y-m-d H:i:s', strtotime($request->start_date)) : null;
        $end_date = $request->end_date != "null" ? date('Y-m-d H:i:s', strtotime($request->end_date)) : null;
        $orderLimit = $request->order_limit != "null" ? intval($request->order_limit) : null;
        $displayMessage = $request->display_message == 1 ? 1 : 0;
        $displayBadge = $request->display_badge == 1 ? 1 : 0;

        $preOrderProduct = PreOrderProducts::where('shop', $shop)
            ->where('id', $request->id)
            ->where('product_id', $request->product_id)
            ->update([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'order_limit' => $orderLimit,
                'display_message' => $displayMessage,
                'display_badge' => $displayBadge,
            ]);

        return response()->json([
            'message' => 'Product Updated Successfully',
            'data' => $preOrderProduct
        ], 200);
    }


    public function destroy(Request $request)
    {
        $product = PreOrderProducts::find($request->id);
        $product->delete();

        return response()->json([
            'message' => 'Product Deleted Successfully'
        ], 200);
    }
}
